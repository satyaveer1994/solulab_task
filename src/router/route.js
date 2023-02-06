const express = require('express');
const router = express.Router();

const {createCategory, getAllCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');
router.post('/category', createCategory);
router.get('/category', getAllCategory);
router.put('/category', updateCategory);
router.delete('/category', deleteCategory);

const {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/productController');

module.exports = router;