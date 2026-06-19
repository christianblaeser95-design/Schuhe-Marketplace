CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id),
  amount DECIMAL(10, 2) NOT NULL,
  method VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  transaction_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_order ON payments(order_id);
