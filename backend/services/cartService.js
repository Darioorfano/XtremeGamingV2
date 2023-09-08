const cartRepository = require("../repositories/cartRepository");

const buys = async() =>{
    const buys = await cartRepository.buys();
    return buys;
}

const buyCart = async( carrito, mediopago, idUsuario ) => {
    const fechaCompra = new Date();
    const result = await cartRepository.buyCart(carrito, mediopago, idUsuario, fechaCompra);
    return result;
}

module.exports = {
    buys,
    buyCart
}