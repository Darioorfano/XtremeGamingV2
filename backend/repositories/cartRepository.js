const {db} = require('../config/firebase');
const { collection,getDocs, addDoc} = require("firebase/firestore"); 


const buys = async () => {
    const querySnapshot = await getDocs(collection(db, "buys"));
    const listBuys = []

    querySnapshot.forEach(doc => {
      let buy = { id: doc.id, ...doc.data()}
      listBuys.push(buy);
    });
    
    return listBuys;
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
    buys,
    buyCart
}