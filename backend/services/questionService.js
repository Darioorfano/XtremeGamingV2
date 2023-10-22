const questionRepository = require('../repositories/questionRepository');

const getQuestionsFromProduct = async (idProduct) => {
    const questions = await questionRepository.getQuestionsFromProduct(idProduct);

    return questions;
}

const getQuestionsFromUser = async (idUser) => {
    const questions = await questionRepository.getQuestionsFromUser(idUser);

    return questions;
}

const postQuestionInProduct = async (idUsuario, idProducto, content, name, photoUrl) => {
    const result = await questionRepository.postQuestionInProduct(idUsuario, idProducto, content, name, photoUrl)
    return result;
}

const replyQuestion = async (idQuestion, idUsuario, content, name, photoUrl) => {
    const result = questionRepository.replyQuestion(idQuestion, idUsuario, content, name, photoUrl)
    return result;
}

module.exports = {
    getQuestionsFromProduct,
    getQuestionsFromUser,
    postQuestionInProduct,
    replyQuestion
}