const express = require('express');
const messagingController = require('./messagingController');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

router.get('/conversations', authMiddleware, messagingController.getConversations);
router.get('/messages/:userId', authMiddleware, messagingController.getMessages);
router.post('/send', authMiddleware, messagingController.sendMessage);

module.exports = router;
