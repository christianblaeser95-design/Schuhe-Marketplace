const express = require('express');
const paymentController = require('./paymentController');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

router.post('/stripe', authMiddleware, paymentController.processStripe);
router.post('/paypal', authMiddleware, paymentController.processPayPal);
router.post('/crypto', authMiddleware, paymentController.processCrypto);
router.get('/:orderId', authMiddleware, paymentController.getPaymentStatus);

module.exports = router;
