const express = require('express');
const router = express.Router();
const Sponsorship = require('../models/Sponsorship');
const { auth, authorize } = require('../middleware/auth');

// Sponsorship tiers
const TIERS = {
    platinum: { minAmount: 100000, benefits: ['Title Sponsor', 'Main Stage Branding', 'Workshop Slot', 'Recruitment Drive'] },
    gold: { minAmount: 50000, benefits: ['Co-Sponsor', 'Banner Placement', 'Recruitment Drive'] },
    silver: { minAmount: 25000, benefits: ['Associate Sponsor', 'Banner Placement'] },
    bronze: { minAmount: 10000, benefits: ['Supporting Sponsor', 'Logo Placement'] },
};

// @route   GET /api/sponsorships/tiers
// @desc    Get available sponsorship tiers
// @access  Public
router.get('/tiers', (req, res) => {
    res.json({ success: true, data: TIERS });
});

// @route   GET /api/sponsorships
// @desc    Get all sponsorships (for events or clubs)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { event, club, status, tier, page = 1, limit = 10 } = req.query;

        const query = {};
        if (event) query.event = event;
        if (club) query.club = club;
        if (status) query.status = status;
        if (tier) query.tier = tier;

        const sponsorships = await Sponsorship.find(query)
            .populate('sponsor', 'email profile.companyName')
            .populate('event', 'title date')
            .populate('club', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        const total = await Sponsorship.countDocuments(query);

        res.json({
            success: true,
            data: sponsorships,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        console.error('Get sponsorships error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/sponsorships/:id
// @desc    Get sponsorship details
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findById(req.params.id)
            .populate('sponsor', 'email profile')
            .populate('event', 'title date venue')
            .populate('club', 'name');

        if (!sponsorship) {
            return res.status(404).json({ success: false, message: 'Sponsorship not found' });
        }

        res.json({ success: true, data: sponsorship });
    } catch (error) {
        console.error('Get sponsorship error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/sponsorships/propose
// @desc    Submit a sponsorship proposal
// @access  Private (Sponsor)
router.post('/propose', auth, async (req, res) => {
    try {
        const {
            type, // 'event' or 'club'
            referenceId, // event or club ID
            tier,
            amount,
            companyName,
            companyWebsite,
            contactPerson,
            contactEmail,
            contactPhone,
            proposal,
            requestedBenefits,
        } = req.body;

        // Validate tier
        if (!TIERS[tier]) {
            return res.status(400).json({ success: false, message: 'Invalid tier' });
        }

        // Validate amount against tier minimum
        if (amount < TIERS[tier].minAmount) {
            return res.status(400).json({
                success: false,
                message: `Minimum amount for ${tier} tier is ₹${TIERS[tier].minAmount}`
            });
        }

        const sponsorship = new Sponsorship({
            sponsor: req.user._id,
            [type]: referenceId,
            tier,
            amount,
            companyDetails: {
                name: companyName,
                website: companyWebsite,
                contactPerson,
                contactEmail,
                contactPhone,
            },
            proposal,
            requestedBenefits,
            status: 'pending',
        });

        await sponsorship.save();

        res.status(201).json({
            success: true,
            message: 'Sponsorship proposal submitted successfully',
            data: sponsorship,
        });
    } catch (error) {
        console.error('Propose sponsorship error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/sponsorships/:id/status
// @desc    Update sponsorship status (Admin only)
// @access  Private (Admin)
router.put('/:id/status', auth, authorize('admin', 'super_admin', 'club_admin'), async (req, res) => {
    try {
        const { status, adminNote, approvedBenefits } = req.body;

        const sponsorship = await Sponsorship.findById(req.params.id);

        if (!sponsorship) {
            return res.status(404).json({ success: false, message: 'Sponsorship not found' });
        }

        if (!['approved', 'rejected', 'negotiating', 'completed'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        sponsorship.status = status;
        sponsorship.adminNote = adminNote;
        sponsorship.reviewedBy = req.user._id;
        sponsorship.reviewedAt = new Date();

        if (status === 'approved' && approvedBenefits) {
            sponsorship.approvedBenefits = approvedBenefits;
        }

        await sponsorship.save();

        res.json({
            success: true,
            message: `Sponsorship ${status}`,
            data: sponsorship,
        });
    } catch (error) {
        console.error('Update sponsorship status error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/sponsorships/my/proposals
// @desc    Get current user's sponsorship proposals
// @access  Private
router.get('/my/proposals', auth, async (req, res) => {
    try {
        const sponsorships = await Sponsorship.find({ sponsor: req.user._id })
            .populate('event', 'title date')
            .populate('club', 'name')
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            data: sponsorships,
        });
    } catch (error) {
        console.error('Get my proposals error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/sponsorships/admin/pending
// @desc    Get pending sponsorship proposals for review
// @access  Private (Admin)
router.get('/admin/pending', auth, authorize('admin', 'super_admin', 'club_admin'), async (req, res) => {
    try {
        const sponsorships = await Sponsorship.find({ status: 'pending' })
            .populate('sponsor', 'email profile')
            .populate('event', 'title date')
            .populate('club', 'name')
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            data: sponsorships,
            count: sponsorships.length,
        });
    } catch (error) {
        console.error('Get pending proposals error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/sponsorships/stats
// @desc    Get sponsorship statistics
// @access  Private (Admin)
router.get('/stats', auth, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const stats = await Sponsorship.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]);

        const tierStats = await Sponsorship.aggregate([
            { $match: { status: 'approved' } },
            {
                $group: {
                    _id: '$tier',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]);

        res.json({
            success: true,
            data: {
                byStatus: stats,
                byTier: tierStats,
            },
        });
    } catch (error) {
        console.error('Get sponsorship stats error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /api/sponsorships/:id
// @desc    Withdraw sponsorship proposal
// @access  Private (Owner only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const sponsorship = await Sponsorship.findById(req.params.id);

        if (!sponsorship) {
            return res.status(404).json({ success: false, message: 'Sponsorship not found' });
        }

        // Only allow owner or admin to delete
        if (sponsorship.sponsor.toString() !== req.user._id.toString() &&
            !['admin', 'super_admin'].includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        // Only allow deletion if pending
        if (sponsorship.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Can only withdraw pending proposals'
            });
        }

        await sponsorship.deleteOne();

        res.json({
            success: true,
            message: 'Proposal withdrawn successfully',
        });
    } catch (error) {
        console.error('Delete sponsorship error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
