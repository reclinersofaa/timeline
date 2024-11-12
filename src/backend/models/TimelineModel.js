const mongoose = require('mongoose');

const tSchema = new mongoose.Schema({
    ECont: { type: String, required: true },
    EDate: { type: Date, required: true },
    EStory: { type: String },
    EImg: { type: String },
    EVid: { type: String },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('events',tSchema);