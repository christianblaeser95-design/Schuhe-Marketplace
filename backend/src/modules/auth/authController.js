const axios = require('axios');
const authService = require('./authService');

async function register(req, res) {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password required' });
    }

    const user = await authService.registerUser(email, name, password);
    const token = authService.generateToken(user);

    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await authService.loginUser(email, password);
    const token = authService.generateToken(user);

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function googleLogin(req, res) {
  try {
    const { idToken } = req.body;

    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?id_token=${idToken}`
    );

    const { email, name } = response.data;
    const user = await authService.findOrCreateUser(email, name, response.data.user_id);
    const token = authService.generateToken(user);

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function facebookLogin(req, res) {
  try {
    const { accessToken } = req.body;

    const response = await axios.get(
      `https://graph.facebook.com/me?fields=id,email,name&access_token=${accessToken}`
    );

    const { email, name, id } = response.data;
    const user = await authService.findOrCreateUser(email, name, null, id);
    const token = authService.generateToken(user);

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function web3Login(req, res) {
  try {
    const { walletAddress, signature, message } = req.body;

    const user = await authService.findOrCreateUser(
      walletAddress,
      walletAddress,
      null,
      null,
      walletAddress
    );
    const token = authService.generateToken(user);

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

function logout(req, res) {
  res.json({ message: 'Logged out' });
}

async function getCurrentUser(req, res) {
  try {
    const userId = req.user.id;
    res.json({ user: req.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { register, login, googleLogin, facebookLogin, web3Login, logout, getCurrentUser };
