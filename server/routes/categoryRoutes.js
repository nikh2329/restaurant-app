const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

// GET /api/categories — list all categories
router.get('/', asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
}));

module.exports = router;
