const productRepository = require('../repositories/productRepository');

const listProduct = async() => {
    const product = await productRepository.listProduct();
    const listProducts = []
    product.forEach(producto => {
        const {_fieldsProto} = producto
        const product = {
            nombre: _fieldsProto.nombre.stringValue,
            descripcion:_fieldsProto.descripcion.stringValue,
            precio: Number(_fieldsProto.precio.integerValue),
            imagen: _fieldsProto.imagen.stringValue
        }
        console.log("Product services",product)
        listProducts.push(product);
    });
   
    return listProducts;
}

const getProductById = async (productId) => {
    const product = await productRepository.getProductById(productId);
    // Lógica adicional del servicio, si es necesario
    return product;
}



module.exports = {
    listProduct,
    getProductById,
};