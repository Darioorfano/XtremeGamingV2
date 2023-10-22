const questionService = require('../services/questionService');


const getQuestionsFromProduct = async (req, res) => {
    const { idProduct } = req.params;

    try {
        const questions = await questionService.getQuestionsFromProduct(idProduct);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
}

const getQuestionsFromUser = async (req, res) => {
    const { idUser } = req.params;

    try {
        const questions = await questionService.getQuestionsFromUser(idUser);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
}

const postQuestion = async (req, res) => {
    const { idUsuario, idProducto, content, name, photoUrl, rol } = req.body;

    try {
        const result = await questionService.postQuestionInProduct(idUsuario, idProducto, content, name, photoUrl, rol)
        res.status(result.code).json({mensaje: result.mensaje})
    } catch (error) {
        res.status(500).json({ error: `Error al crear la pregunta` });
    }
}

const replyQuestion = async (req, res) => {
    const { idUsuario, idQuestion, content, name, photoUrl, rol } = req.body;

    try {
        const result = await questionService.replyQuestion(idQuestion, idUsuario, content, name, photoUrl, rol)
        res.status(result.code).json({mensaje: result.mensaje})
    } catch (error) {
        res.status(500).json({ error: `Error al enviar la respuesta` });
    }
}

module.exports = {
    getQuestionsFromProduct,
    getQuestionsFromUser,
    postQuestion,
    replyQuestion
}