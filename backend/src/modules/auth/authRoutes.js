const express = require('express');
const authController = require('./authController');

const router = express.Router();

router.post('/google', authController.googleLogin);
router.post('/facebook', authController.facebookLogin);
router.post('/web3-connect', authController.web3Login);
router.post('/logout', authController.logout);
router.get('/me', authController.getCurrentUser);

module.exports = router;
