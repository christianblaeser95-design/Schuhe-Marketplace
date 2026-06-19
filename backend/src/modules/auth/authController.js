const axios = require('axios');
const authService = require('./authService');

async function googleLogin(req, res) {
  try {
    const { idToken } = req.body;

    // Verify token with Google (simplified)
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

    // Verify with Facebook (simplified)
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

    // Verify signature (simplified - use ethers.js in production)
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
    // Fetch user from DB
    res.json({ user: req.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { googleLogin, facebookLogin, web3Login, logout, getCurrentUser };
