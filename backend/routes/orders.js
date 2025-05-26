const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', orderController.createOrder);

// Update existing order
router.put('/:id', orderController.updateOrderStatus);

// Get all or filtered orders
router.get('/', orderController.getOrders);

module.exports = router;
