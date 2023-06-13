const productController = require('../controller/productController.js');
const reviewController = require('../controller/reviewController.js');

const router = require('express').Router();

router.post('/add', productController.addProduct);
router.get('/get-all', productController.getProducts);
router.get('/get-details/:id', productController.getDetailsProduct);
router.put('/edit/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

router.get('/getProductReviews/:id', productController.getProductReviews)

// Review Url and Controller

router.get('/allReviews', reviewController.getAllReviews)
router.post('/addReview/:id', reviewController.addReview)
module.exports = router
               