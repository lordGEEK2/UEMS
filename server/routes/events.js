const express = require('express');
const Event = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, status, club, search, sort } = req.query;
        let query = { isActive: true };

        if (category) query.category = category;
        if (status) query.status = status;
        if (club) query.club = club;

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        let sortOption = { date: 1 }; // Default: upcoming first
        if (sort === 'popular') sortOption = { 'registrations.length': -1 };
        if (sort === 'price') sortOption = { price: 1 };

        const events = await Event.find(query)
            .populate('club', 'name slug')
            .sort(sortOption)
            .limit(50);

        res.json({ success: true, count: events.length, events });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   GET /api/events/:slug
// @desc    Get event by slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug })
            .populate('club', 'name slug coordinator')
            .populate('organizers.user', 'profile.firstName profile.lastName')
            .populate('registrations.user', 'profile.firstName profile.lastName email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ success: true, event });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private/Club Admin
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, category, clubId, date, time, venue, price, maxRegistrations, tags } = req.body;

        const event = await Event.create({
            title,
            description,
            category,
            club: clubId,
            date,
            time,
            venue,
            price: price || 0,
            maxRegistrations: maxRegistrations || 100,
            tags: tags || [],
            organizers: [{ user: req.user._id, role: 'Lead Organizer' }],
        });

        res.status(201).json({ success: true, event });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   POST /api/events/:slug/register
// @desc    Register for an event
// @access  Private
router.post('/:slug/register', protect, async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if already registered
        const isRegistered = event.registrations.some(r => r.user.toString() === req.user._id.toString());
        if (isRegistered) {
            return res.status(400).json({ message: 'Already registered for this event' });
        }

        // Check if event is full
        if (event.registrations.length >= event.maxRegistrations) {
            return res.status(400).json({ message: 'Event is full' });
        }

        // Add registration
        event.registrations.push({
            user: req.user._id,
            paymentStatus: event.price > 0 ? 'pending' : 'completed',
        });
        await event.save();

        res.json({
            success: true,
            message: event.price > 0 ? 'Registered. Please complete payment.' : 'Registration successful',
            requiresPayment: event.price > 0,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/events/:slug/register
// @desc    Cancel registration
// @access  Private
router.delete('/:slug/register', protect, async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const registrationIndex = event.registrations.findIndex(r => r.user.toString() === req.user._id.toString());

        if (registrationIndex === -1) {
            return res.status(400).json({ message: 'Not registered for this event' });
        }

        event.registrations.splice(registrationIndex, 1);
        await event.save();

        res.json({ success: true, message: 'Registration cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
