const {db} = require('../config/firebase');
const { collection, doc, getDocs, getDoc } = require("firebase/firestore"); 


const listProduct = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const listProduct = []

    querySnapshot.forEach(doc => {
      let product = { id: doc.id, ...doc.data()}
      listProduct.push(product);
    });
    
    return listProduct;
}


const getProductById = async (productId) => {
    const docRef = doc(db, "products", productId);
    const product = await getDoc(docRef);
    return product.exists ? {id: productId, ...product.data()} : null;
    
}

module.exports = {
  getProductById,
  listProduct,
};