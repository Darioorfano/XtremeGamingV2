const reviewRepository = require('../repositories/reviewRepository');


const postReview = async(name, rating, comment, idUser, idProducto) => {
    const result = await reviewRepository.postReview(name, rating, comment, idUser, idProducto);
    return result;
}

const getReviewsFromProduct = async (idProduct) => {
    const reviews = await reviewRepository.getReviewsFromProduct(idProduct);
    // Lógica adicional del servicio, si es necesario
    return reviews;
}



module.exports = {
    getReviewsFromProduct,
    postReview,
};