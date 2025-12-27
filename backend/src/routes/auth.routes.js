const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register tenant
router.post('/register-tenant', authController.registerTenant);

// Login
router.post('/login', authController.login);

// Get current user
router.get('/me', authController.me);

module.exports = router;
