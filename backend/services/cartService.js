const cartRepository = require("../repositories/cartRepository");

const buyCart = async( carrito, mediopago, idUsuario ) => {
    const fechaCompra = new Date();
    const result = await cartRepository.buyCart(carrito, mediopago, idUsuario, fechaCompra);
    return result;
}

const getPurchasesByUser = async( idUsuario ) => {
    const reviews = await cartRepository.getReviewsFromProduct(idUsuario);
    return {code: 200, compras: reviews};
}

module.exports = {
    buyCart,
    getPurchasesByUser
}