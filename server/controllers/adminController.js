const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const MenuItem = require('../models/menuItemModel');
exports.getAdminStats = asyncHandler(async (req, res) => {
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalMenuItems = await MenuItem.countDocuments();
    const orders = await Order.find({});
    const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    res.json({ totalOrders, totalCustomers, totalMenuItems, totalRevenue: revenue });
});
