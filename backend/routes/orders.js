const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrderStatus);
router.get('/', orderController.getOrders);

module.exports = router;
