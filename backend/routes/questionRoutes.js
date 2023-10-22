const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Rutas relacionadas con los usuarios
router.get('/getQuestions/:idProduct', questionController.getQuestionsFromProduct);
router.get('/getQuestions/:idUser', questionController.getQuestionsFromUser);
router.post('/add-question', questionController.postQuestion);
router.post('/reply-question', questionController.replyQuestion);
module.exports = router;