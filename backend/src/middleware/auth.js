const jwt = require('jsonwebtoken');
const { createError } = require('./errorHandler');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(createError('Access token required', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.alumni = decoded;
        next();
    } catch (error) {
        next(createError('Invalid or expired token', 403));
    }
};

module.exports = { authenticateToken };
