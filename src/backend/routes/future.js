
const express = require('express');
const router = express.Router();
const futureDet  = require('../models/FutureD');
const auth = require('../middleware/auth');
const upload = require('../config/multerc');


router.post('/schedule', auth, upload.fields([{ name: 'image' }, { name: 'video' }]), async (req, res) => {
    console.log('req.user:', req.user);
    const { msg, date} = req.body;
    const img = req.files['image'] ? req.files['image'][0].path : null;
    const vid = req.files['video'] ? req.files['video'][0].path : null;
  
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ error: 'User ID is missing or user not authenticated' });
        }
        const newMessage = new futureDet({
        userId: req.user.userId, // Extracted from auth middleware
        msg,
        date,
        img,
        vid
        });
  
        await newMessage.save();
        res.status(201).json({ message: 'Message scheduled successfully', newMessage });
    } 
    catch (error) {
        console.error('Error while scheduling the message:', error); 
        res.status(500).json({ error: 'Error scheduling the message' });
    }
});
  
  // Route to get all scheduled messages for a user
router.get('/scheduled', auth, async (req, res) => {
    try {
        const messages = await futureDet.find({ userId: req.user.userId });
        res.status(200).json({ messages });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error fetching scheduled messages' });
    }
});
  
module.exports = router;
  
  