const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Module routes (placeholder)
app.use('/api/auth', require('./modules/auth/authRoutes'));
app.use('/api/products', require('./modules/products/productRoutes'));
app.use('/api/payments', require('./modules/payments/paymentRoutes'));
app.use('/api/messages', require('./modules/messaging/messagingRoutes'));
app.use('/api/users', require('./modules/users/userRoutes'));

module.exports = app;
