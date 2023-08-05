const cartRepository = require("../repositories/cartRepository");

const buys = async() =>{
    const buys = await cartRepository.buys();
    return buys;
}

module.exports = {
    buys
}