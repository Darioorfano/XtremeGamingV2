const {db} = require('../config/firebase');
const { addDoc, collection } = require("firebase/firestore"); 

const postReview = async (name, rating, comment, idUser, idProducto) => {
    try{

        const docRef = await addDoc(collection(db, "reviews"), { name, rating, comment, idUser, idProducto});

        return {code: 201, mensaje: `La resenia ${docRef.id} se ha creado con exito` };

    } catch (error){
        console.log(error)
    }
      
}

module.exports = {
    postReview
}