const cartService = require("../services/cartService");

const buyCart = async (req, res) => {
  try {
    const buys = await cartService.buys();
    res.json(buys);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};
module.exports = {
  buyCart,
};
