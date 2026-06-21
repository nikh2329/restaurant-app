const mongoose = require('mongoose');
const revSchema = mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }, rating: Number, comment: String }, { timestamps: true });
module.exports = mongoose.model('Review', revSchema);
