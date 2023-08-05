const productRepository = require('../repositories/productRepository');

const listProduct = async() => {
    const products = await productRepository.listProduct();
    return products;
}

const getProductById = async (productId) => {
    const product = await productRepository.getProductById(productId);
    // Lógica adicional del servicio, si es necesario
    return product;
}

const getProductsByName = async(name)=>{
    const productsByName = await productRepository.getProductsByName(name);
    return productsByName;
}

module.exports = {
    listProduct,
    getProductById,
    getProductsByName
};