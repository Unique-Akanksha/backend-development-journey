const productRepository = require('../repositories/productRepository');

const getAllProducts = () => {
    return productRepository.getAll();
}

const getProductById = (id) => {
    return productRepository.findById(id);
}

const createProduct = (product) => {
    return productRepository.create(product);
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById
}