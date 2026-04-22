const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Event = require('../models/Event');
const Registration = require('../models/Registration');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Club = require('../models/Club');

// @route   GET /api/analytics/dashboard
// @desc    Get admin dashboard metrics
// @access  Private (Admin)
router.get('/dashboard', auth, authorize('admin', 'club_admin', 'club_head', 'super_admin'), async (req, res) => {
    try {
        const now = new Date();
        const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

        // Run all aggregations in parallel for speed
        const [
            totalEvents,
            upcomingEvents,
            totalRegistrations,
            recentRegistrations,
            revenueAgg,
            recentRevenueAgg,
            attendanceAgg,
            totalUsers,
            totalClubs,
            topEvents,
            registrationTrend,
        ] = await Promise.all([
            Event.countDocuments({ isActive: true }),
            Event.countDocuments({ date: { $gte: now }, status: 'upcoming', isActive: true }),
            Registration.countDocuments(),
            Registration.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
            Payment.aggregate([
                { $match: { status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            Payment.aggregate([
                { $match: { status: 'completed', createdAt: { $gte: thirtyDaysAgo } } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            Registration.aggregate([
                { $match: { status: 'attended' } },
                { $group: { _id: null, count: { $sum: 1 } } },
            ]),
            User.countDocuments({ isActive: true }),
            Club.countDocuments({ isActive: true }),
            // Top 5 events by registration count
            Registration.aggregate([
                { $group: { _id: '$event', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 },
                { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'event' } },
                { $unwind: '$event' },
                { $project: { title: '$event.title', slug: '$event.slug', registrations: '$count' } },
            ]),
            // Registration trend (last 30 days by date)
            Registration.aggregate([
                { $match: { createdAt: { $gte: thirtyDaysAgo } } },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
        ]);

        const totalRevenue = revenueAgg[0]?.total || 0;
        const recentRevenue = recentRevenueAgg[0]?.total || 0;
        const totalAttendance = attendanceAgg[0]?.count || 0;
        const attendanceRate = totalRegistrations > 0
            ? Math.round((totalAttendance / totalRegistrations) * 100)
            : 0;

        res.json({
            success: true,
            data: {
                overview: {
                    totalEvents,
                    upcomingEvents,
                    totalRegistrations,
                    recentRegistrations,
                    totalRevenue,
                    recentRevenue,
                    totalUsers,
                    totalClubs,
                    attendanceRate,
                },
                topEvents,
                registrationTrend,
            },
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/analytics/club/:clubId
// @desc    Get club-specific analytics
// @access  Private (Club Admin)
router.get('/club/:clubId', auth, async (req, res) => {
    try {
        const clubId = req.params.clubId;

        const [events, memberCount] = await Promise.all([
            Event.find({ club: clubId, isActive: true }),
            User.countDocuments({ 'clubs.club': clubId }),
        ]);

        const eventIds = events.map(e => e._id);

        const [registrations, revenue] = await Promise.all([
            Registration.countDocuments({ event: { $in: eventIds } }),
            Payment.aggregate([
                { $match: { status: 'completed', 'reference.id': { $in: eventIds } } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
        ]);

        res.json({
            success: true,
            data: {
                totalEvents: events.length,
                totalRegistrations: registrations,
                totalRevenue: revenue[0]?.total || 0,
                memberCount,
            },
        });
    } catch (error) {
        console.error('Club analytics error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
