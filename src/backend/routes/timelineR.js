const express = require('express');
const router = express.Router();
const TimelineModel = require('../models/TimelineModel');
const auth = require('../middleware/auth');
const upload = require('../config/multerc');

// POST: Create an event
router.post('/event', auth, upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
    try {
        const { ECont, EDate, EStory } = req.body;
        const { image, video } = req.files;

        if (!ECont || !EDate) {
            return res.status(400).json({ message: "Event content and date are required" });
        }

        const event = new TimelineModel({
            ECont,
            EDate,
            EStory,
            EImg: image ? `uploads/${image[0].filename}` : '',  // Ensure relative path is saved
            EVid: video ? `uploads/${video[0].filename}` : '',
            UserId: req.user.userId
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating event" });
    }
});

// GET: Get all events for the logged-in user
router.get('/events', auth, async (req, res) => {
    try {
        const events = await TimelineModel.find({ UserId: req.user.userId }).sort({ EDate: -1 });
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving events" });
    }
});

// GET: Get a single event by ID
router.get('/event/:id', auth, async (req, res) => {
    try {
        const event = await TimelineModel.findOne({ _id: req.params.id, UserId: req.user.userId });
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving event" });
    }
});

// PUT: Update an event by ID
router.put('/event/:id', auth, upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
    try {
        const { ECont, EDate, EStory } = req.body;
        const { image, video } = req.files;

        const updatedData = {
            ECont,
            EDate,
            EStory,
            EImg: image ? image[0].path : '',  // Update image path
            EVid: video ? video[0].path : ''   // Update video path
        };

        const event = await TimelineModel.findOneAndUpdate(
            { _id: req.params.id, UserId: req.user.userId },
            updatedData,
            { new: true }
        );

        if (!event) {
            return res.status(404).json({ message: "Event not found or not authorized" });
        }

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating event" });
    }
});

// DELETE: Delete an event by ID
router.delete('/event/:id', auth, async (req, res) => {
    try {
        const event = await TimelineModel.findOneAndDelete({ _id: req.params.id, UserId: req.user.userId });

        if (!event) {
            return res.status(404).json({ message: "Event not found or not authorized" });
        }

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting event" });
    }
});

module.exports = router;