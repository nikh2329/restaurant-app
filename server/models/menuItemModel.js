const mongoose = require('mongoose');
const menuItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, required: true },
    ingredients: [String],
    tags: [String],
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });
module.exports = mongoose.model('MenuItem', menuItemSchema);
