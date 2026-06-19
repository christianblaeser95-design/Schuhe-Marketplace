const messagingService = require('./messagingService');

async function getConversations(req, res) {
  try {
    const conversations = await messagingService.getConversations(req.user.id);
    res.json(conversations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getMessages(req, res) {
  try {
    const messages = await messagingService.getMessages(req.user.id, req.params.userId);
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function sendMessage(req, res) {
  try {
    const { receiverId, content } = req.body;
    const message = await messagingService.sendMessage(req.user.id, receiverId, content);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getConversations, getMessages, sendMessage };
