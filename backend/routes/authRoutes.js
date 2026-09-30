const express = require('express');
const router = express.Router();
const { login, logout, getMe } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { loginValidation } = require('../middleware/validator');

router.post('/login', loginValidation, login);
router.post('/logout', logout);
router.get('/me', authenticateAdmin, getMe);

module.exports = router;
