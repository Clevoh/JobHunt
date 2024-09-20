const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

// Check if user is authenticated
exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
}

// Middleware for admin
exports.isAdmin = (req, res, next) => {
    // Check if user is an admin (assuming admin role is 1)
    if (req.user.role !== 1) { // Adjust this if your admin role is different
        return next(new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next();
}
