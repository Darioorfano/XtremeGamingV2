const {db} = require('../config/firebase');
const { addDoc, collection, query, getDocs, where } = require("firebase/firestore"); 

const getReviewsFromProduct = async (idProduct) => {
    try {
        const listReviews = []
        const q = query(collection(db, "reviews"), where("idProducto", "==", idProduct));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            let review = { 
                name:doc.data().name,
                rating: doc.data().rating,
                comment: doc.data().comment
            }
            listReviews.push(review);
        });
    
        return listReviews;

    } catch (error) {
        console.log(error)
        return {code: 500, mensaje: error };
    }
}

const postReview = async (name, rating, comment, idUser, idProducto) => {
    try{

        const docRef = await addDoc(collection(db, "reviews"), { name, rating, comment, idUser, idProducto});

        return {code: 201, mensaje: `La resenia ${docRef.id} se ha creado con exito` };

    } catch (error){
        return {code: 500, mensaje: error };
    }
      
}

module.exports = {
    postReview,
    getReviewsFromProduct
}