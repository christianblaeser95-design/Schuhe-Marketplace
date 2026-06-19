const paymentService = require('./paymentService');

async function processStripe(req, res) {
  try {
    const { orderId, amount, token } = req.body;
    const payment = await paymentService.processStripePayment(orderId, amount, token);
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function processPayPal(req, res) {
  try {
    const { orderId, amount, paymentId } = req.body;
    const payment = await paymentService.processPayPalPayment(orderId, amount, paymentId);
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function processCrypto(req, res) {
  try {
    const { orderId, amount, txHash } = req.body;
    const payment = await paymentService.processCryptoPayment(orderId, amount, txHash);
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getPaymentStatus(req, res) {
  try {
    const payment = await paymentService.getPaymentStatus(req.params.orderId);
    res.json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { processStripe, processPayPal, processCrypto, getPaymentStatus };
