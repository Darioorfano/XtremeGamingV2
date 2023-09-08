const {db} = require('../config/firebase');
const { collection,getDocs, addDoc, query,where, orderBy, limit } = require("firebase/firestore"); 


const getReviewsFromProduct = async ( idUsuario ) => {
    
  try {
    const q = query(
      collection(db, "purchases"), 
      where("idUsuario", "==", idUsuario),
      limit(3));

    const listPurchases = []

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let purchase = { 
          nroCompra: doc.id,
          fechaCompra: secondsToDate(doc.data().fechaCompra.seconds),
          monto: doc.data().carrito.precioTotal
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

const secondsToDate = (seconds) => {
  return new Date(seconds * 1000); // Multiplica por 1000 para convertir segundos en milisegundos
}

module.exports = {
  getReviewsFromProduct,
    buyCart
}