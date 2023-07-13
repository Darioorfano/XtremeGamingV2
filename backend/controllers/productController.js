const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.listProduct();        
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({ error: `El producto id: ${id} no existe` });
        }
        
        res.json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Error al obtener el producto id: ${id}` });
    }
};
const getProduct = async (req,res) => {
    try{
        const product = await productService.listProduct();
        res.json(product);
    }catch(error){
        console.error('Error al obtener el producto:',error)
        res.status(500).json('Error al obtener el producto');
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getProduct
}