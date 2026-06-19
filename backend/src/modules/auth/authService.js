const pool = require('../../db/config');
const jwt = require('jsonwebtoken');

async function findOrCreateUser(email, name, googleId, facebookId, walletAddress) {
  const query = `
    SELECT * FROM users WHERE email = $1
  `;
  const result = await pool.query(query, [email]);

  if (result.rows.length > 0) {
    return result.rows[0];
  }

  const createQuery = `
    INSERT INTO users (email, name, google_id, facebook_id, wallet_address)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const newUser = await pool.query(createQuery, [email, name, googleId, facebookId, walletAddress]);
  return newUser.rows[0];
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = { findOrCreateUser, generateToken };
