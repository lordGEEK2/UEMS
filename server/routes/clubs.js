const express = require('express');
const Club = require('../models/Club');
const ChatRoom = require('../models/ChatRoom');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/clubs
// @desc    Get all clubs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = { isActive: true };

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { coordinator: { $regex: search, $options: 'i' } },
            ];
        }

        const clubs = await Club.find(query)
            .select('name slug category coordinator logo memberCount')
            .sort('name');

        res.json({ success: true, count: clubs.length, clubs });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/clubs/:slug
// @desc    Get club by slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const club = await Club.findOne({ slug: req.params.slug })
            .populate('members.user', 'profile.firstName profile.lastName email')
            .populate('chatRoom');

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        res.json({ success: true, club });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/clubs
// @desc    Create a new club
// @access  Private/Admin
router.post('/', protect, authorize('super_admin'), async (req, res) => {
    try {
        const { name, category, description, coordinator } = req.body;

        // Create club
        const club = await Club.create({
            name,
            category,
            description,
            coordinator,
        });

        // Create chat room for the club
        const chatRoom = await ChatRoom.create({
            name: `${name} Chat`,
            type: 'club',
            club: club._id,
            participants: [],
            admins: [],
        });

        // Link chat room to club
        club.chatRoom = chatRoom._id;
        await club.save();

        res.status(201).json({ success: true, club });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/clubs/:slug/join
// @desc    Request to join a club
// @access  Private
router.post('/:slug/join', protect, async (req, res) => {
    try {
        const club = await Club.findOne({ slug: req.params.slug });

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Check if already a member
        const isMember = club.members.some(m => m.user.toString() === req.user._id.toString());
        if (isMember) {
            return res.status(400).json({ message: 'Already a member of this club' });
        }

        // Check if already requested
        const hasRequested = club.pendingRequests.some(r => r.user.toString() === req.user._id.toString());
        if (hasRequested) {
            return res.status(400).json({ message: 'Join request already pending' });
        }

        // Add join request
        club.pendingRequests.push({
            user: req.user._id,
            message: req.body.message || '',
        });
        await club.save();

        res.json({ success: true, message: 'Join request submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/clubs/:slug/approve/:userId
// @desc    Approve join request
// @access  Private/Club Admin
router.put('/:slug/approve/:userId', protect, async (req, res) => {
    try {
        const club = await Club.findOne({ slug: req.params.slug });

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Check if user is club admin
        const adminMembership = club.members.find(m =>
            m.user.toString() === req.user._id.toString() && ['admin', 'head'].includes(m.role)
        );

        if (!adminMembership && req.user.role !== 'super_admin') {
            return res.status(403).json({ message: 'Only club admins can approve requests' });
        }

        // Find and remove from pending requests
        const requestIndex = club.pendingRequests.findIndex(r => r.user.toString() === req.params.userId);
        if (requestIndex === -1) {
            return res.status(404).json({ message: 'Join request not found' });
        }

        club.pendingRequests.splice(requestIndex, 1);

        // Add to members
        club.members.push({
            user: req.params.userId,
            role: 'member',
        });

        // Add to chat room participants
        if (club.chatRoom) {
            await ChatRoom.findByIdAndUpdate(club.chatRoom, {
                $addToSet: { participants: req.params.userId },
            });
        }

        await club.save();

        res.json({ success: true, message: 'Member approved' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
