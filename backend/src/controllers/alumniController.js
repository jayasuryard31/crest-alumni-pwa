const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../utils/auth');
const { createError } = require('../middleware/errorHandler');

const prisma = new PrismaClient();

const getProfile = async (req, res, next) => {
    try {
        const alumni = await prisma.alumni.findUnique({
            where: { id: req.alumni.id },
        });

        if (!alumni) {
            return next(createError('Alumni not found', 404));
        }

        // Return alumni data without password hash
        const { passwordHash, ...alumniData } = alumni;

        res.json({
            success: true,
            alumni: {
                ...alumniData,
                current_position: alumni.currentPosition,
                current_company: alumni.currentCompany,
                profile_photo_url: alumni.profilePhotoUrl,
                is_approved: alumni.isApproved,
                created_at: alumni.createdAt,
                updated_at: alumni.updatedAt,
                last_login: alumni.lastLogin,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getProfileByToken = async (req, res, next) => {
    try {
        const { token } = req.body || {};

        if (!token) {
            return next(createError('Token is required', 400));
        }

        // Verify token
        const decoded = verifyToken(token);

        // Check if token is expired
        if (decoded.exp <= Date.now() / 1000) {
            return next(createError('Token expired', 401));
        }

        const alumni = await prisma.alumni.findUnique({
            where: { id: decoded.id },
        });

        if (!alumni) {
            return next(createError('Alumni not found', 404));
        }

        // Return alumni data without password hash
        const { passwordHash, ...alumniData } = alumni;

        res.json({
            success: true,
            alumni: {
                ...alumniData,
                current_position: alumni.currentPosition,
                current_company: alumni.currentCompany,
                profile_photo_url: alumni.profilePhotoUrl,
                is_approved: alumni.isApproved,
                created_at: alumni.createdAt,
                updated_at: alumni.updatedAt,
                last_login: alumni.lastLogin,
            },
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return next(createError('Invalid or expired token', 401));
        }
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const allowedFields = [
            'name', 'phone', 'city', 'state', 'country', 'pincode',
            'currentPosition', 'currentCompany', 'profilePhotoUrl'
        ];

        const updateData = {};

        // Only include allowed fields that are present in the request
        for (const field of allowedFields) {
            if (req.body && req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        if (Object.keys(updateData).length === 0) {
            return next(createError('No valid fields to update', 400));
        }

        const alumni = await prisma.alumni.update({
            where: { id: req.alumni.id },
            data: updateData,
        });

        // Return alumni data without password hash
        const { passwordHash, ...alumniData } = alumni;

        res.json({
            success: true,
            message: 'Profile updated successfully',
            alumni: {
                ...alumniData,
                current_position: alumni.currentPosition,
                current_company: alumni.currentCompany,
                profile_photo_url: alumni.profilePhotoUrl,
                is_approved: alumni.isApproved,
                created_at: alumni.createdAt,
                updated_at: alumni.updatedAt,
                last_login: alumni.lastLogin,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getAllAlumni = async (req, res, next) => {
    try {
        const query = req.query || {};
        const { page = 1, limit = 10, search = '', batch = '', course = '', branch = '' } = query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Build where clause for filtering
        const where = {
            isApproved: true, // Only show approved alumni
        };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { usn: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (batch) {
            where.batch = batch;
        }

        if (course) {
            where.course = course;
        }

        if (branch) {
            where.branch = branch;
        }

        const [alumni, total] = await Promise.all([
            prisma.alumni.findMany({
                where,
                select: {
                    id: true,
                    email: true,
                    name: true,
                    usn: true,
                    batch: true,
                    course: true,
                    branch: true,
                    city: true,
                    state: true,
                    country: true,
                    currentPosition: true,
                    currentCompany: true,
                    profilePhotoUrl: true,
                    createdAt: true,
                },
                skip,
                take: limitNum,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.alumni.count({ where }),
        ]);

        res.json({
            success: true,
            data: alumni.map(alumnus => ({
                ...alumnus,
                current_position: alumnus.currentPosition,
                current_company: alumnus.currentCompany,
                profile_photo_url: alumnus.profilePhotoUrl,
                created_at: alumnus.createdAt,
            })),
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum),
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getProfile, getProfileByToken, updateProfile, getAllAlumni };
