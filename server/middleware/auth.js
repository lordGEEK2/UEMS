const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or expired' });
    }
};

// Role-based access control
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role '${req.user.role}' is not authorized to access this route`
            });
        }
        next();
    };
};

// Check if user is club admin/head
exports.isClubAdmin = async (req, res, next) => {
    const clubId = req.params.clubId || req.body.clubId;

    if (!clubId) {
        return res.status(400).json({ message: 'Club ID is required' });
    }

    const membership = req.user.clubs.find(c => c.club.toString() === clubId);

    if (!membership || !['admin', 'head'].includes(membership.role)) {
        return res.status(403).json({ message: 'Only club admins can perform this action' });
    }

    next();
};
