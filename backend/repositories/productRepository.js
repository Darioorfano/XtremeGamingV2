//const dbPromise = require('../config/db');
//const ObjectId = require('mongodb').ObjectId;
const {db} = require('../config/firebase');

// const listProduct = async () => {
//     const db = await dbPromise;
//     const products = db.collection('products');

//     const options = {
//         // Include only the `title` and `imdb` fields in each returned document
//         projection: {publicationDate:0,specification:0}
//       };


//     const listOfProducts = await products.find({},options);


//     return listOfProducts.toArray();


// }

const listProduct = async () => {
    const products = db.collection('products');
    const snapshot = await products.get();
    const listProduct = []

    snapshot.forEach(doc => {
      listProduct.push(doc);
      console.log("listado de productos",listProduct)
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