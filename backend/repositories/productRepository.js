const dbPromise = require('../config/db');
const ObjectId = require('mongodb').ObjectId;

const listProduct = async () => {
    const db = await dbPromise;
    const products = db.collection('products');

    const listOfProducts = await products.find();

    return listOfProducts.toArray();


}

const getProductById = async (productId) => {
    
    const db = await dbPromise;
    const products = db.collection('products');

    const query = { _id: new ObjectId(productId) };

    const product = await products.findOne(query);
    return product;
    
}


module.exports = {
    listProduct,
    getProductById
};