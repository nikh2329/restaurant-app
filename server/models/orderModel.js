const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ name: String, qty: Number, image: String, price: Number, product: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' } }],
    shippingAddress: { street: String, city: String, zipCode: String, country: String },
    paymentMethod: { type: String, default: 'Credit Card' },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Processing', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'], default: 'Processing' },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
