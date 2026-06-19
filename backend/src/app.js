const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Mock)
const users = new Map();
const products = [
  { id: 1, seller_id: 1, title: 'Nike Air Max 90', description: 'Guter Zustand', price: 45.99, size: '42', condition: 'gut', status: 'active' },
  { id: 2, seller_id: 1, title: 'Adidas Stan Smith', description: 'Wie neu', price: 35.50, size: '41', condition: 'wie_neu', status: 'active' },
  { id: 3, seller_id: 2, title: 'Puma Runner', description: 'Gebrauchte Laufschuhe', price: 25.00, size: '43', condition: 'gebraucht', status: 'active' },
];
let userIdCounter = 100;
let productIdCounter = 100;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Auth Middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Auth: Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (Array.from(users.values()).find(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = userIdCounter++;

    const user = { id: userId, email, name, passwordHash, role: 'buyer' };
    users.set(userId, user);

    const token = jwt.sign({ id: userId, email }, 'secret', { expiresIn: '24h' });
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Auth: Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = Array.from(users.values()).find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Products: Get All
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Products: Get One
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Products: Create (requires auth)
app.post('/api/products', authMiddleware, (req, res) => {
  try {
    const { title, description, price, size, condition } = req.body;
    const product = {
      id: productIdCounter++,
      seller_id: req.user.id,
      title,
      description,
      price,
      size,
      condition,
      status: 'active'
    };
    products.push(product);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
