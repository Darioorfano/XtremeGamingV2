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


// const getProductById = async (productId) => {
    
// //     const db = await dbPromise;
// //     const products = db.collection('products');

// //     const query = { _id: new ObjectId(productId) };

// //     const product = await products.findOne(query);
// //     return product;
    
// // }


module.exports = {
  //  listProduct,
   // getProductById,
    listProduct,
};