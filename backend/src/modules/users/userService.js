const pool = require('../../db/config');

async function getUserProfile(id) {
  const query = 'SELECT id, email, name, profile_pic, role, created_at FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function updateProfile(id, userId, profileData) {
  if (id != userId) throw new Error('Unauthorized');

  const { name, profilePic } = profileData;
  const query = `
    UPDATE users SET name = $1, profile_pic = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *
  `;
  const result = await pool.query(query, [name, profilePic, id]);
  return result.rows[0];
}

async function createReview(fromUserId, toUserId, reviewData) {
  const { rating, text } = reviewData;
  const query = `
    INSERT INTO reviews (from_user_id, to_user_id, rating, text)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query(query, [fromUserId, toUserId, rating, text]);
  return result.rows[0];
}

async function getUserReviews(userId) {
  const query = 'SELECT * FROM reviews WHERE to_user_id = $1 ORDER BY created_at DESC';
  const result = await pool.query(query, [userId]);
  return result.rows;
}

module.exports = { getUserProfile, updateProfile, createReview, getUserReviews };
