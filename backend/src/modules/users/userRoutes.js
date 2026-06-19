const express = require('express');
const userController = require('./userController');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

router.get('/:id', userController.getUserProfile);
router.put('/:id', authMiddleware, userController.updateProfile);
router.post('/:id/reviews', authMiddleware, userController.createReview);
router.get('/:id/reviews', userController.getUserReviews);

module.exports = router;
