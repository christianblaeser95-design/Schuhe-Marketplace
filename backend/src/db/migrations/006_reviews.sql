CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  from_user_id INTEGER NOT NULL REFERENCES users(id),
  to_user_id INTEGER NOT NULL REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_to_user ON reviews(to_user_id);
