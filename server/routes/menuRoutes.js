const express = require('express'); 
const router = express.Router(); 
const { getMenuItems, getMenuItemById, createMenuItem, deleteMenuItem } = require('../controllers/menuController'); 
const { protect, admin } = require('../middleware/authMiddleware'); 
router.get("/", getMenuItems); 
router.get("/:id", getMenuItemById);
router.post("/", protect, admin, createMenuItem); 
router.delete("/:id", protect, admin, deleteMenuItem); 
module.exports = router;
