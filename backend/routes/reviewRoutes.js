const express = require('express');
const router = express.Router();
const previewController = require('../controllers/reviewController');

// Rutas relacionadas con los usuarios
router.get('/getReviews/:idProduct', previewController.getReviewsFromProduct);
router.post('/add-review', previewController.postReview);
module.exports = router;