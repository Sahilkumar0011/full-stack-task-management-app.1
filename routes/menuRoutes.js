const express = require('express');
const {
  getAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Fetch all menu items
router.get('/', getAllMenuItems);

// Add a new menu item
router.post('/', authenticate, addMenuItem);

// Update a menu item
router.put('/:id', authenticate, updateMenuItem);

// Delete a menu item 
router.delete('/:id', authenticate, deleteMenuItem);

module.exports = router;
