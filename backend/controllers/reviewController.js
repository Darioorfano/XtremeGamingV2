const reviewService = require('../services/reviewService');

const getReviewsFromProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
        const reviews = await reviewService.getReviewsFromProduct(idProduct);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las resenias' });
    }
};

const postReview = async (req, res) => {
    const { name, rating, comment, idUser, idProducto, imageUrl } = req.body;
    try {
        const result = await reviewService.postReview(name, rating, comment, idUser, idProducto, imageUrl);
        console.log(result)
        res.status(result.code).json({ mensaje: result.mensaje });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Error al crear una resenia` });
    }
};

module.exports = {
    getReviewsFromProduct,
    postReview
}