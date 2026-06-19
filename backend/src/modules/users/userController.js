const userService = require('./userService');

async function getUserProfile(req, res) {
  try {
    const user = await userService.getUserProfile(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateProfile(req, res) {
  try {
    const user = await userService.updateProfile(req.params.id, req.user.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createReview(req, res) {
  try {
    const review = await userService.createReview(req.user.id, req.params.id, req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserReviews(req, res) {
  try {
    const reviews = await userService.getUserReviews(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getUserProfile, updateProfile, createReview, getUserReviews };
