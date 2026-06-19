const pool = require('../../db/config');

async function getAllProducts(filters = {}) {
  let query = 'SELECT * FROM products WHERE status = $1';
  const params = ['active'];

  if (filters.minPrice) {
    query += ' AND price >= $' + (params.length + 1);
    params.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    query += ' AND price <= $' + (params.length + 1);
    params.push(filters.maxPrice);
  }

  if (filters.size) {
    query += ' AND size = $' + (params.length + 1);
    params.push(filters.size);
  }

  const result = await pool.query(query, params);
  return result.rows;
}

async function getProductById(id) {
  const query = 'SELECT * FROM products WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

async function createProduct(sellerId, productData) {
  const { title, description, price, photos, size, condition } = productData;
  const query = `
    INSERT INTO products (seller_id, title, description, price, photos, size, condition)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const result = await pool.query(query, [
    sellerId, title, description, price, photos, size, condition
  ]);
  return result.rows[0];
}

async function updateProduct(id, userId, productData) {
  // Verify ownership
  const product = await getProductById(id);
  if (product.seller_id !== userId) {
    throw new Error('Unauthorized');
  }

  const { title, description, price, status } = productData;
  const query = `
    UPDATE products SET title = $1, description = $2, price = $3, status = $4
    WHERE id = $5
    RETURNING *
  `;
  const result = await pool.query(query, [title, description, price, status, id]);
  return result.rows[0];
}

async function deleteProduct(id, userId) {
  const product = await getProductById(id);
  if (product.seller_id !== userId) {
    throw new Error('Unauthorized');
  }

  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
