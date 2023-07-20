const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rutas relacionadas con los usuarios
router.get('/', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.get('/search/:name',productController.getProductsByName)

module.exports = router;