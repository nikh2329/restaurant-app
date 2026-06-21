const asyncHandler = require('express-async-handler');
const MenuItem = require('../models/menuItemModel');
exports.getMenuItems = asyncHandler(async (req, res) => {
    const { category, search, featured } = req.query;
    let query = {};
    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (featured === 'true') query.isFeatured = true;
    const items = await MenuItem.find(query).populate('category');
    res.json(items);
});
exports.getMenuItemById = asyncHandler(async (req, res) => {
    const item = await MenuItem.findById(req.params.id).populate('category');
    if (item) {
        res.json(item);
    } else {
        res.status(404);
        throw new Error('Menu item not found');
    }
});
exports.createMenuItem = asyncHandler(async (req, res) => {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
});
exports.deleteMenuItem = asyncHandler(async (req, res) => {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed' });
});

