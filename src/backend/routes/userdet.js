const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetails');
const auth = require('../middleware/auth');

router.post('/user-details', auth, async (req,res) => {
    console.log('Route hit');
    console.log('Request body:', req.body);
    const {favColor, favFood, DreamTrav, Hobby} = req.body;
    try{
        let userdet = await UserDetails.findOne({ userId: req.user.userId });
        if (userdet) {
            // Update existing detailss
            userdet.favColor = favColor;
            userdet.favFood = favFood;
            userdet.DreamTrav = DreamTrav;
            userdet.Hobby = Hobby;
        }  
        else {
            // Create new details if none exist
            userdet = new UserDetails({
                userId: req.user.userId,
                favColor,
                favFood,
                DreamTrav,
                Hobby
            });
        }

        await userdet.save();
        res.status(201).json(userdet);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

router.get('/user-details', auth, async (req, res) => {
    try {
      const userdets = await UserDetails.findOne({ userId: req.user.userId }).populate('userId');
      if (!userdets) {
        return res.status(404).json({ message: 'User details not found' });
      }
      res.status(200).json(userdets);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  module.exports = router; 