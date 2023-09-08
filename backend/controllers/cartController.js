const cartService = require("../services/cartService");

const buyCart = async (req, res) => {
  const { carrito, medioDePago, idUsuario } = req.body;
  try {
    const result = await cartService.buyCart(carrito, medioDePago, idUsuario);
    res.status(result.code).json({ mensaje: result.mensaje });
  } catch (error) {
    res.status(500).json({ error: "Error al comprar al carrito" });
  }
};
module.exports = {
  buyCart,
};
