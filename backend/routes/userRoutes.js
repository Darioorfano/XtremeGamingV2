const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas relacionadas con los usuarios
router.post('/login', userController.login);
router.post('/register', userController.register);
// router.get('/validateToken', userController.validateToken)

module.exports = router;