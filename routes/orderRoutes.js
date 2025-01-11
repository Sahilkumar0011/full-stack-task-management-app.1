const express = require('express');
const { placeOrder, getUserOrders } = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Place an order
router.post('/', authenticate, placeOrder);

// Fetch all orders for the logged-in user
router.get('/', authenticate, getUserOrders);

module.exports = router;
