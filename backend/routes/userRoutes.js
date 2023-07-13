const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas relacionadas con los usuarios
router.get('/login', userController.login);
router.get('/register', userController.register);

module.exports = router;