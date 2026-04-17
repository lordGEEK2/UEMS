const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/registrations
// @desc    Register for an event
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { eventId, team } = req.body;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if already registered
        const existingReg = await Registration.findOne({
            user: req.user._id,
            event: eventId,
        });
        if (existingReg) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Create registration
        const registration = await Registration.create({
            user: req.user._id,
            event: eventId,
            team,
            status: event.requiresPayment ? 'pending' : 'confirmed',
            paymentStatus: event.requiresPayment ? 'pending' : 'not_required',
        });

        await registration.populate('event', 'title slug startDate');

        res.status(201).json({ success: true, registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/registrations/my
// @desc    Get user's registrations
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id })
            .populate('event', 'title slug startDate endDate venue')
            .sort({ createdAt: -1 });

        res.json({ success: true, registrations });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/registrations/event/:eventId
// @desc    Get registrations for an event (organizer only)
// @access  Private
router.get('/event/:eventId', protect, async (req, res) => {
    try {
        // TODO: Check if user is event organizer
        const registrations = await Registration.find({ event: req.params.eventId })
            .populate('user', 'profile.firstName profile.lastName email')
            .sort({ createdAt: -1 });

        res.json({ success: true, registrations, count: registrations.length });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/registrations/:id
// @desc    Get single registration
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id)
            .populate('event')
            .populate('user', 'profile.firstName profile.lastName email');

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        // Check ownership
        if (registration.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        res.json({ success: true, registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/registrations/:id/cancel
// @desc    Cancel registration
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        if (registration.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        if (registration.status === 'attended') {
            return res.status(400).json({ message: 'Cannot cancel attendance marked registration' });
        }

        registration.status = 'cancelled';
        await registration.save();

        res.json({ success: true, registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/registrations/:id/checkin
// @desc    Check-in attendee
// @access  Private (organizer)
router.put('/:id/checkin', protect, async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        registration.status = 'attended';
        registration.checkInTime = new Date();
        await registration.save();

        res.json({ success: true, registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/registrations/:id/feedback
// @desc    Submit event feedback
// @access  Private
router.post('/:id/feedback', protect, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const registration = await Registration.findById(req.params.id);

        if (!registration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        if (registration.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        registration.feedback = {
            rating,
            comment,
            submittedAt: new Date(),
        };
        await registration.save();

        res.json({ success: true, registration });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
