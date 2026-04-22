const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.name}: ${err.message}`, { 
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // Mongoose Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({ success: false, message: `Duplicate value entered for ${field}` });
    }

    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).json({ success: false, message });
    }

    // JWT Error
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
    }

    // Razorpay signature error (for payments phase 1.4)
    if (err.name === 'SignatureVerificationError') {
        return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
    });
};

module.exports = errorHandler;
