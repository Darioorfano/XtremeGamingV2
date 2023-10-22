const {db} = require('../config/firebase');
const { addDoc, collection, query, doc, getDocs, setDoc, where } = require("firebase/firestore"); 

const getQuestionsFromProduct = async (idProduct) => {
    try {
        const listQuestions = []
        const q = query(collection(db, "questions"), where("idProducto", "==", idProduct));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            let question = { 
                idQuestion: doc.id,
                name:doc.data().name,
                content: doc.data().content,
                fecha: secondsToDate(doc.data().fecha.seconds),
                idProducto: doc.data().idProducto,
                idUsuario: doc.data().idUsuario,
                photoUrl: doc.data().photoUrl,
                respondido: doc.data().respondido,
                respuesta: doc.data().respuesta,
                rol: doc.data().rol
            }
            listQuestions.push(question);
        });

        return listQuestions;

    } catch (error) {
        console.log(error)
        return {code: 500, mensaje: error };
    }
}

const getQuestionsFromUser = async (idUser) => {
    try {
        const listQuestions = []
        const q = query(collection(db, "questions"), where("idUsuario", "==", idUser));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            let question = { 
                idQuestion: doc.id,
                name:doc.data().name,
                content: doc.data().content,
                fecha: secondsToDate(doc.data().fecha.seconds),
                idProducto: doc.data().idProducto,
                idUsuario: doc.data().idUsuario,
                photoUrl: doc.data().photoUrl,
                respondido: doc.data().respondido,
                respuesta: doc.data().respuesta,
                rol: doc.data().rol
            }
            listQuestions.push(question);
        });

        return listQuestions;

    } catch (error) {
        console.log(error)
        return {code: 500, mensaje: error };
    }
}

const postQuestionInProduct = async (idUsuario, idProducto, content, name, photoUrl) => {
    let fecha = new Date();
    let respondido = false;
    let rol = "cliente"
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

const replyQuestion = async (idQuestion, idUsuario, content, name, photoUrl) => {
    let fecha = new Date();
    let respondido = true;
    let rol = "admin"
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

const secondsToDate = (seconds) => {
    return new Date(seconds * 1000); // Multiplica por 1000 para convertir segundos en milisegundos
  }

module.exports = {
    getQuestionsFromProduct,
    getQuestionsFromUser,
    postQuestionInProduct,
    replyQuestion
}