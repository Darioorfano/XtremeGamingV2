const {db} = require('../config/firebase');
const { addDoc, collection, query, doc, getDocs, setDoc, where } = require("firebase/firestore"); 

const getQuestionsFromProduct = (idProduct) => {
    const listQuestions = []
    const q = query(collection(db, "reviews"), where("idProducto", "==", idProduct));
}

const getQuestionsFromUser = (idUser) => {

}

const postQuestionInProduct = async (idUsuario, idProducto, content, name, photoUrl, rol) => {
    let fecha = new Date();
    let respondido = false;
    let respuesta = {};
    try {
        const question = {
            idUsuario,
            idProducto,
            content,
            fecha,
            name,
            photoUrl,
            rol,
            respondido,
            respuesta
        }

        const docRef = await addDoc(collection(db, "questions"), question )

        return { code: 201, mensaje: `Se envió tu respuesta ${docRef.id}`}
    } catch (error) {
        console.log(error)
        return {code: 500, mensaje: error };
    }
}

const replyQuestion = async (idQuestion, idUsuario, content, name, photoUrl, rol) => {
    let fecha = new Date();
    let respondido = true;
    try {
        const respuesta = {
            idUsuario,
            content,
            fecha,
            name,
            photoUrl,
            rol
        }

        const docRef = doc(db, 'questions', idQuestion);
        setDoc(docRef, { respondido, respuesta }, { merge: true });


        return { code: 201, mensaje: `Se respondio la pregunta`}
    } catch (error) {
        console.log(error)
        return {code: 500, mensaje: error };
    }
}

module.exports = {
    getQuestionsFromProduct,
    getQuestionsFromUser,
    postQuestionInProduct,
    replyQuestion
}