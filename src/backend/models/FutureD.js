const mongoose = require('mongoose');

const FutureMsg = new mongoose.Schema({
  msg: { type: String, required: true },
  date: { type: Date, required: true },
  img: { type: String },
  vid: { type: String },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('FutureD', FutureMsg);
