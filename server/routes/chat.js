const express = require('express');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/chat/rooms
// @desc    Get user's chat rooms
// @access  Private
router.get('/rooms', protect, async (req, res) => {
    try {
        const rooms = await ChatRoom.find({
            participants: req.user._id,
            isActive: true,
        })
            .populate('lastMessage')
            .populate('club', 'name slug')
            .sort({ lastMessageAt: -1 });

        res.json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/chat/rooms/:id
// @desc    Get chat room details
// @access  Private
router.get('/rooms/:id', protect, async (req, res) => {
    try {
        const room = await ChatRoom.findById(req.params.id)
            .populate('participants', 'profile.firstName profile.lastName email')
            .populate('club', 'name slug');

        if (!room) {
            return res.status(404).json({ message: 'Chat room not found' });
        }

        // Check if user is participant
        if (!room.participants.some(p => p._id.toString() === req.user._id.toString())) {
            return res.status(403).json({ message: 'Not a participant of this chat room' });
        }

        res.json({ success: true, room });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/chat/rooms/:id/messages
// @desc    Get messages for a chat room
// @access  Private
router.get('/rooms/:id/messages', protect, async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;

        const messages = await Message.find({
            chatRoom: req.params.id,
            isDeleted: false,
        })
            .populate('sender', 'profile.firstName profile.lastName')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Reverse to get chronological order
        const orderedMessages = messages.reverse();

        res.json({ success: true, messages: orderedMessages });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/chat/rooms/:id/messages
// @desc    Send a message
// @access  Private
router.post('/rooms/:id/messages', protect, async (req, res) => {
    try {
        const { content, type = 'text' } = req.body;

        const room = await ChatRoom.findById(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Chat room not found' });
        }

        // Create message
        const message = await Message.create({
            chatRoom: req.params.id,
            sender: req.user._id,
            content,
            type,
        });

        // Update room's last message
        room.lastMessage = message._id;
        room.lastMessageAt = new Date();
        await room.save();

        // Populate sender info
        await message.populate('sender', 'profile.firstName profile.lastName');

        res.status(201).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/chat/rooms
// @desc    Create a new group chat
// @access  Private
router.post('/rooms', protect, async (req, res) => {
    try {
        const { name, participants } = req.body;

        // Add creator to participants
        const allParticipants = [...new Set([req.user._id.toString(), ...participants])];

        const room = await ChatRoom.create({
            name,
            type: 'group',
            participants: allParticipants,
            admins: [req.user._id],
        });

        res.status(201).json({ success: true, room });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/chat/rooms/:id/read
// @desc    Mark messages as read
// @access  Private
router.put('/rooms/:id/read', protect, async (req, res) => {
    try {
        await Message.updateMany(
            {
                chatRoom: req.params.id,
                'readBy.user': { $ne: req.user._id },
            },
            {
                $addToSet: {
                    readBy: { user: req.user._id, readAt: new Date() },
                },
            }
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
