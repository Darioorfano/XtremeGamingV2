const productRepository = require('../repositories/productRepository');


const listProduct = async () => {
    const list = await productRepository.listProduct();

    return list;
}

const getProductById = async (productId) => {
    const product = await productRepository.getProductById(productId);
    // Lógica adicional del servicio, si es necesario
    return product;
}


module.exports = {
    listProduct,
    getProductById
};