const {db} = require('../config/firebase');
const { collection,getDocs, addDoc, query,where } = require("firebase/firestore"); 


const getReviewsFromProduct = async ( idUsuario ) => {
    
  try {
    const q = query(collection(db, "purchases"), where("idUsuario", "==", idUsuario));
    const listPurchases = []

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let purchase = { 
          nroCompra: doc.id,
          fechaCompra: doc.data().fechaCompra,
          monto: doc.data().precioTotal
      }
      listPurchases.push(purchase);
  });
    
    return listPurchases;

  } catch (error) {
    console.log(error)
    return {code: 500, mensaje: error };
}
}

const buyCart = async (carrito, mediopago, idUsuario, fechaCompra) => {
  try{

      const docRef = await addDoc(collection(db, "purchases"), { carrito, mediopago, idUsuario, fechaCompra });

      return {code: 201, mensaje: `Se ha comprado con exito. Compra nro ${docRef.id}` };

  } catch (error){
    console.log(error)
      return {code: 500, mensaje: error };
  }
    
}

module.exports = {
  getReviewsFromProduct,
    buyCart
}