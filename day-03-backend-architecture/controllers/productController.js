const productService = require('../services/productService');

const getAllProducts = ((req, res) => {
    const product = productService.getAllProducts();
    res.statusCode = 200;
    return res.end(
        JSON.stringify({
            "status": 200,
            "data": product
        })
    )
});

const getProductById = ((req, res, id) => {
    const product = productService.getProductById(id);
    if (!product) {
        res.statusCode = 404;
        return res.end(JSON.stringify({
            status: 404,
            message: "Product not found"
        }));
    }

    res.statusCode = 200;
    return res.end(
        JSON.stringify({
            "status": 200,
            "message": "User Fetched Successfully",
            "data": product
        })
    );

});

const createProduct = ((req, res, product) => {
    const createdProduct = productService.createProduct(product);

    res.statusCode = 201;
    return res.end(
        JSON.stringify({
            "status": 201,
            "message": "User Created Successfully!",
            "data": createdProduct,
        })
    )
});

module.exports = {
    getAllProducts,
    getProductById,
    createProduct
}