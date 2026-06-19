const pool = require('../../db/config');

async function getConversations(userId) {
  const query = `
    SELECT DISTINCT
      CASE
        WHEN sender_id = $1 THEN receiver_id
        ELSE sender_id
      END as other_user_id,
      MAX(created_at) as last_message_time
    FROM messages
    WHERE sender_id = $1 OR receiver_id = $1
    GROUP BY other_user_id
    ORDER BY last_message_time DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

async function getMessages(userId, otherUserId, limit = 50) {
  const query = `
    SELECT * FROM messages
    WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY created_at DESC
    LIMIT $3
  `;
  const result = await pool.query(query, [userId, otherUserId, limit]);
  return result.rows.reverse();
}

async function sendMessage(senderId, receiverId, content) {
  const query = `
    INSERT INTO messages (sender_id, receiver_id, content)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const result = await pool.query(query, [senderId, receiverId, content]);
  return result.rows[0];
}

module.exports = { getConversations, getMessages, sendMessage };
