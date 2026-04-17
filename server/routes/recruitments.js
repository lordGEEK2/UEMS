const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Recruitment = require('../models/Recruitment');
const Application = require('../models/Application');

// @route   GET /api/recruitments
// @desc    Get all active recruitments
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { club, status = 'open', search, page = 1, limit = 10 } = req.query;

        const query = {};

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by club
        if (club) {
            query.clubId = club;
        }

        // Search
        if (search) {
            query.$or = [
                { position: { $regex: search, $options: 'i' } },
                { club: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const recruitments = await Recruitment.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('applicationCount');

        const total = await Recruitment.countDocuments(query);

        res.json({
            success: true,
            data: recruitments,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / parseInt(limit)),
                total: total,
            },
        });
    } catch (error) {
        console.error('Get recruitments error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/recruitments/:id
// @desc    Get recruitment details
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const recruitment = await Recruitment.findById(req.params.id)
            .populate('applicationCount');

        if (!recruitment) {
            return res.status(404).json({ success: false, message: 'Recruitment not found' });
        }

        res.json({
            success: true,
            data: recruitment,
        });
    } catch (error) {
        console.error('Get recruitment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/recruitments
// @desc    Create new recruitment posting
// @access  Private (Club Admin)
router.post('/', auth, authorize('club_admin', 'club_head', 'admin', 'super_admin'), async (req, res) => {
    try {
        const { position, club, clubId, description, requirements, skills, deadline, positions } = req.body;

        const newRecruitment = await Recruitment.create({
            position,
            club,
            clubId,
            description,
            requirements,
            skills: skills || [],
            deadline,
            positions: positions || 1,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: 'Recruitment created successfully',
            data: newRecruitment,
        });
    } catch (error) {
        console.error('Create recruitment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/recruitments/:id
// @desc    Update recruitment
// @access  Private (Club Admin)
router.put('/:id', auth, authorize('club_admin', 'club_head', 'admin', 'super_admin'), async (req, res) => {
    try {
        // Find recruitment and check ownership (in a real app, verify they belong to this club)
        let recruitment = await Recruitment.findById(req.params.id);

        if (!recruitment) {
            return res.status(404).json({ success: false, message: 'Recruitment not found' });
        }

        recruitment = await Recruitment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Recruitment updated',
            data: recruitment,
        });
    } catch (error) {
        console.error('Update recruitment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /api/recruitments/:id
// @desc    Delete recruitment
// @access  Private (Club Admin)
router.delete('/:id', auth, authorize('club_admin', 'club_head', 'admin', 'super_admin'), async (req, res) => {
    try {
        const recruitment = await Recruitment.findById(req.params.id);

        if (!recruitment) {
            return res.status(404).json({ success: false, message: 'Recruitment not found' });
        }

        // Delete all applications for this recruitment
        await Application.deleteMany({ recruitment: req.params.id });
        await Recruitment.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Recruitment and related applications deleted',
        });
    } catch (error) {
        console.error('Delete recruitment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/recruitments/:id/apply
// @desc    Apply for a recruitment
// @access  Private
router.post('/:id/apply', auth, async (req, res) => {
    try {
        const recruitment = await Recruitment.findById(req.params.id);

        if (!recruitment) {
            return res.status(404).json({ success: false, message: 'Recruitment not found' });
        }

        if (recruitment.status !== 'open') {
            return res.status(400).json({ success: false, message: 'Recruitment is closed' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            recruitment: req.params.id,
            applicant: req.user._id,
        });

        if (existingApplication) {
            return res.status(400).json({ success: false, message: 'Already applied' });
        }

        const { resume, coverLetter, portfolio, answers } = req.body;

        const application = await Application.create({
            recruitment: req.params.id,
            applicant: req.user._id,
            resume,
            coverLetter,
            portfolio,
            answers,
        });

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: { applicationId: application._id },
        });
    } catch (error) {
        console.error('Apply error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/recruitments/:id/applications
// @desc    Get applications for a recruitment
// @access  Private (Club Admin)
router.get('/:id/applications', auth, authorize('club_admin', 'club_head', 'admin', 'super_admin'), async (req, res) => {
    try {
        const recruitment = await Recruitment.findById(req.params.id);

        if (!recruitment) {
            return res.status(404).json({ success: false, message: 'Recruitment not found' });
        }

        const { status } = req.query;
        const query = { recruitment: req.params.id };

        if (status) {
            query.status = status;
        }

        const applications = await Application.find(query)
            .populate('applicant', 'profile email role')
            .sort({ createdAt: -1 });

        // Include userEmail and userName for compatibility with frontend if it expects flattened structure
        const formattedApplications = applications.map(app => {
            const appObj = app.toObject();
            return {
                ...appObj,
                userId: app.applicant?._id,
                userEmail: app.applicant?.email,
                userName: `${app.applicant?.profile?.firstName || ''} ${app.applicant?.profile?.lastName || ''}`.trim() || 'Unknown User'
            };
        });

        res.json({
            success: true,
            data: formattedApplications,
            total: applications.length,
        });
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/recruitments/:id/applications/:appId
// @desc    Update application status
// @access  Private (Club Admin)
router.put('/:id/applications/:appId', auth, authorize('club_admin', 'club_head', 'admin', 'super_admin'), async (req, res) => {
    try {
        let application = await Application.findOne({
            _id: req.params.appId,
            recruitment: req.params.id
        });

        if (!application) {
            return res.status(404).json({ success: false, message: 'Application not found' });
        }

        const { status, feedback } = req.body;

        application = await Application.findByIdAndUpdate(
            req.params.appId,
            {
                status: status || application.status,
                feedback: feedback || application.feedback,
                reviewedAt: new Date(),
                reviewedBy: req.user._id
            },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            message: 'Application updated',
            data: application,
        });
    } catch (error) {
        console.error('Update application error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/recruitments/my/applications
// @desc    Get user's own applications
// @access  Private
router.get('/my/applications', auth, async (req, res) => {
    try {
        const userApplications = await Application.find({ applicant: req.user._id })
            .populate('recruitment', 'position club status')
            .sort({ createdAt: -1 });

        // Add recruitment info mapping to match frontend expectations
        const enriched = userApplications.map(app => {
            const appObj = app.toObject();
            return {
                ...appObj,
                recruitmentId: app.recruitment?._id,
                recruitment: app.recruitment ? {
                    id: app.recruitment._id,
                    position: app.recruitment.position,
                    club: app.recruitment.club,
                    status: app.recruitment.status
                } : null,
            };
        });

        res.json({
            success: true,
            data: enriched,
        });
    } catch (error) {
        console.error('Get my applications error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
