import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../utils/auth';
import { createError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const alumni = await prisma.alumni.findUnique({
      where: { id: req.alumni!.id },
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

export const getProfileByToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body || {};

    if (!token) {
      return next(createError('Token is required', 400));
    }

    // Verify token
    const decoded = verifyToken(token) as any;
    
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
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(createError('Invalid or expired token', 401));
    }
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const allowedFields = [
      'name', 'phone', 'city', 'state', 'country', 'pincode',
      'currentPosition', 'currentCompany', 'profilePhotoUrl'
    ];

    const updateData: any = {};
    
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
      where: { id: req.alumni!.id },
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

export const getAllAlumni = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const query = req.query || {};
    const { page = 1, limit = 10, search = '', batch = '', course = '', branch = '' } = query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause for filtering
    const where: any = {
      isApproved: true, // Only show approved alumni
    };

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { usn: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    if (batch) {
      where.batch = batch as string;
    }

    if (course) {
      where.course = course as string;
    }

    if (branch) {
      where.branch = branch as string;
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
