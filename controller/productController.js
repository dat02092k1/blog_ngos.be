const { where } = require('sequelize');
const db = require('../models')

// create main model
const Product = db.products;
const Review = db.reviews;

// main work flow

// 1. create product
const addProduct = async (req, res) => {
    console.log(req.body);
    console.log('flag');
    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    }

    const product = await Product.create(info);

    console.log(product);

    res.status(200).send(product);
}
// 2.get all products
const getProducts = async (req, res) => {
    const products = await Product.findAll({});

    console.log(products);

    res.status(200).send(products);
}
// 3.get one product
const getDetailsProduct = async (req, res) => {
    let id = req.params.id;
    const product = await Product.findOne({ where: { id: id } })

    console.log(product);

    res.status(200).send(product);
}
// 4.update product
const updateProduct = async (req, res) => {
    let id = req.params.id;
    const product = await Product.update(req.body, { where: { id: id } })
    console.log(product);
    res.status(200).send(product);
}
// 5.delete product
const deleteProduct = async (req, res) => {
    let id = req.params.id;
    await Product.destroy({ where: { id: id } })

    res.status(200).send('delete successfully');
}

const getProductReviews =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}

module.exports = {
    addProduct,
    getProducts,
    getDetailsProduct,
    updateProduct,
    deleteProduct,
    getProductReviews
}