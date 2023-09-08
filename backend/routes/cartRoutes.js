const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/comprar', cartController.buyCart);
router.get('/mis-compras/:idUsuario', cartController.getPurchasesByUser);

module.exports = router;