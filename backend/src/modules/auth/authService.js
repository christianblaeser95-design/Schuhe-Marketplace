const pool = require('../../db/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

async function registerUser(email, name, password) {
  const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    throw new Error('Email already registered');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (email, name, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const result = await pool.query(query, [email, name, passwordHash]);
  return result.rows[0];
}

async function loginUser(email, password) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);

  if (result.rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = result.rows[0];
  if (!user.password_hash) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = { findOrCreateUser, registerUser, loginUser, generateToken };
