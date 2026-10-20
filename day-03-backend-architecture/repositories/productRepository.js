const products = [];

const getAll = () => {
    return products;
}

const findById = (id) => {
    return products.find((item) => item.id === id);
}

const create = (product) => {
    products.push(product);
    return product;

}
module.exports = {
    getAll, findById, create
};