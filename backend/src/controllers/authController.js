const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { createError } = require('../middleware/errorHandler');

const prisma = new PrismaClient();

// Validation schemas
const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    usn: z.string().min(1, 'USN is required'),
    batch: z.string().min(1, 'Batch is required'),
    course: z.string().min(1, 'Course is required'),
    branch: z.string().min(1, 'Branch is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().default('India'),
    pincode: z.string().min(1, 'Pincode is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    currentPosition: z.string().optional(),
    currentCompany: z.string().optional(),
});

const login = async (req, res, next) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        // Find alumni by email
        const alumni = await prisma.alumni.findUnique({
            where: { email },
        });

        if (!alumni) {
            return next(createError('Invalid email or password', 401));
        }

        // Check if alumni is approved
        if (!alumni.isApproved) {
            return next(createError('Your account is pending approval', 403));
        }

        // Verify password
        const isValidPassword = await comparePassword(password, alumni.passwordHash);
        if (!isValidPassword) {
            return next(createError('Invalid email or password', 401));
        }

        // Update last login
        await prisma.alumni.update({
            where: { id: alumni.id },
            data: { lastLogin: new Date() },
        });

        // Generate JWT token
        const token = generateToken({ id: alumni.id, email: alumni.email });

        // Return alumni data without password hash
        const { passwordHash, ...alumniData } = alumni;

        res.json({
            success: true,
            message: 'Login successful',
            token,
            alumni: {
                ...alumniData,
                current_position: alumni.currentPosition,
                current_company: alumni.currentCompany,
                profile_photo_url: alumni.profilePhotoUrl,
                is_approved: alumni.isApproved,
                created_at: alumni.createdAt,
                updated_at: alumni.updatedAt,
                last_login: new Date(),
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return next(createError(error.errors[0].message, 400));
        }
        next(error);
    }
};

const register = async (req, res, next) => {
    try {
        const data = registerSchema.parse(req.body);

        // Check if email already exists
        const existingEmail = await prisma.alumni.findUnique({
            where: { email: data.email },
        });

        if (existingEmail) {
            return next(createError('Email already registered', 409));
        }

        // Check if USN already exists
        const existingUSN = await prisma.alumni.findUnique({
            where: { usn: data.usn },
        });

        if (existingUSN) {
            return next(createError('USN already registered', 409));
        }

        // Hash password
        const passwordHash = await hashPassword(data.password);

        // Create new alumni
        const alumni = await prisma.alumni.create({
            data: {
                email: data.email,
                passwordHash,
                name: data.name,
                usn: data.usn,
                batch: data.batch,
                course: data.course,
                branch: data.branch,
                city: data.city,
                state: data.state,
                country: data.country,
                pincode: data.pincode,
                phone: data.phone,
                currentPosition: data.currentPosition,
                currentCompany: data.currentCompany,
            },
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful! Please wait for approval.',
            id: alumni.id,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return next(createError(error.errors[0].message, 400));
        }
        next(error);
    }
};

module.exports = { login, register };
