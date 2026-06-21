const mongoose = require('mongoose');
const resSchema = mongoose.Schema({ guestName: String, guestEmail: String, guestPhone: String, reservationDate: Date, reservationTime: String, numGuests: Number, status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' } }, { timestamps: true });
module.exports = mongoose.model('Reservation', resSchema);
