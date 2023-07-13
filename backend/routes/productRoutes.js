const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas relacionadas con los usuarios
router.get('/', productController.getAllProducts);
//router.get('/:id', productController.getProductById);
module.exports = router;