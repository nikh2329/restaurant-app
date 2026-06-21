const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const MenuItem = require('../models/menuItemModel');

exports.createOrder = asyncHandler(async (req, res) => {
    const { items, totalPrice } = req.body;
    
    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }
    
    const orderItems = [];
    for (const item of items) {
        const menuItem = await MenuItem.findById(item.menuItem);
        if (!menuItem) {
            res.status(404);
            throw new Error(`Menu item not found: ${item.menuItem}`);
        }
        orderItems.push({
            name: menuItem.name,
            qty: item.quantity,
            image: menuItem.image,
            price: item.price,
            product: menuItem._id
        });
    }

    const order = new Order({
        user: req.user._id,
        orderItems,
        totalPrice,
        paymentMethod: req.body.paymentMethod || 'Credit Card'
    });
    
    const created = await order.save();
    res.status(201).json(created);
});
exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user');
    res.json(orders);
});
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, { new: true });
    res.json(order);
});
