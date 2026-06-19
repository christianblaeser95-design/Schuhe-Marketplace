const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchProducts(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/products?${params}`);
  return response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
}

export async function createProduct(product, token) {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  return response.json();
}

export async function processPayment(method, paymentData, token) {
  const response = await fetch(`${API_URL}/payments/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(paymentData)
  });
  return response.json();
}
