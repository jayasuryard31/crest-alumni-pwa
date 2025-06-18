import { Router } from 'express';
import { getProfile, getProfileByToken, updateProfile, getAllAlumni } from '../controllers/alumniController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /api/alumni/profile-by-token (for compatibility with existing client)
router.post('/profile-by-token', getProfileByToken);

// Protected routes - require authentication
router.use(authenticateToken);

// GET /api/alumni/profile
router.get('/profile', getProfile);

// PUT /api/alumni/profile
router.put('/profile', updateProfile);

// GET /api/alumni/all
router.get('/all', getAllAlumni);

export default router;
