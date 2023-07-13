//const dbPromise = require('../config/db');
//const ObjectId = require('mongodb').ObjectId;
const {db} = require('../config/firebase');


const listProduct = async () => {
    const products = db.collection('products');
    const snapshot = await products.get();
    const listProduct = []

    snapshot.forEach(doc => {
      console.log(doc.id)
      let product = { id: doc.id, ...doc.data()}
      listProduct.push(product);
    });
    
    return listProduct;
}


const getProductById = async (productId) => {
  
    const products = db.collection('products').doc(productId);
    const product = await products.get();
    return product.exists ? {id: productId, ...product.data()} : null;
    
}


module.exports = {
  //  listProduct,
  getProductById,
  listProduct,
};