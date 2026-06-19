const pool = require('../../db/config');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

async function processStripePayment(orderId, amount, token) {
  try {
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      source: token,
      description: `Order ${orderId}`
    });

    const query = `
      INSERT INTO payments (order_id, amount, method, status, transaction_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [orderId, amount, 'stripe', 'completed', charge.id]);

    // Mark order as paid
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', orderId]);

    return result.rows[0];
  } catch (error) {
    throw new Error(`Stripe payment failed: ${error.message}`);
  }
}

async function processPayPalPayment(orderId, amount, paymentId) {
  // Simplified PayPal flow
  const query = `
    INSERT INTO payments (order_id, amount, method, status, transaction_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(query, [orderId, amount, 'paypal', 'completed', paymentId]);

  await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', orderId]);

  return result.rows[0];
}

async function processCryptoPayment(orderId, amount, txHash) {
  const query = `
    INSERT INTO payments (order_id, amount, method, status, transaction_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(query, [orderId, amount, 'crypto', 'completed', txHash]);

  await pool.query('UPDATE orders SET status = $1 WHERE id = $2', ['paid', orderId]);

  return result.rows[0];
}

async function getPaymentStatus(orderId) {
  const query = 'SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at DESC LIMIT 1';
  const result = await pool.query(query, [orderId]);
  return result.rows[0];
}

module.exports = {
  processStripePayment,
  processPayPalPayment,
  processCryptoPayment,
  getPaymentStatus
};
