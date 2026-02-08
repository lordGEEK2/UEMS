const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', protect, authorize('super_admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ success: true, count: users.length, users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password')
            .populate('clubs.club', 'name slug category');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        // Only allow user to update their own profile (unless admin)
        if (req.user._id.toString() !== req.params.id && req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Not authorized to update this profile' });
        }

        const { firstName, lastName, department, year, phone } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                'profile.firstName': firstName,
                'profile.lastName': lastName,
                'profile.department': department,
                'profile.year': year,
                'profile.phone': phone,
            },
            { new: true, runValidators: true }
        ).select('-password');

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
