const { Router } = require('express');
const { login, register } = require('../controllers/authController');

const router = Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post('/register', register);

module.exports = router;
