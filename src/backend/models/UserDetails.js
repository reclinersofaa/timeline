const mongoose = require('mongoose');

const UserDet = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    favColor: { type: String, required: true },
    favFood: { type: String, required: true },
    DreamTrav: {type: String, required: true},
    Hobby: {type: String, required: true}
}, { timestamps: true });

module.exports = mongoose.model('UserDetails', UserDet);
