const productModel = require('../models/productModel');
const categeoryModel = require('../controllers/categoryController');
const categoryModel = require('../models/categoryModel');

const createProduct = async function (req, res) {
    try {
        const body = req.body;
        if (Object.keys(body).length == 0) return res.status(400).send({ status: false, message: 'please provide all required details to create a product' });
        const { productId, productName, qtyPerUnit, unitInStock, discontinued, categoryId } = body;
        if (!productId) return res.status(400).send({ status: false, message: 'productId is required, please provide productId to register a product' });
        if (productId != Number(productId) || productId < 1) return res.status(400).send({ status: false, message: 'productId is invalid, please provide a valid productId to create a product' });
        if (!productName) return res.status(400).send({ status: false, message: 'productId is required, please provide productName to register a product' });
        if (!qtyPerUnit) return res.status(400).send({ status: false, message: 'productId is required, please provide qtyPerUnit to register a product' });
        if (qtyPerUnit != Number(qtyPerUnit) || qtyPerUnit < 1) return res.status(400).send({ status: false, message: 'qtyPerUnit is invalid, please provide a valid qtyPerUnit to create a product' });
        if (!unitInStock) return res.status(400).send({ status: false, message: 'productId is required, please provide unitInStock to register a product' });
        if (unitInStock != Number(unitInStock) || unitInStock < 1) return res.status(400).send({ status: false, message: 'unitInStock is invalid, please provide a valid unitInStock to create a product' });
        if (!categoryId) return res.status(400).send({ status: false, message: 'productId is required, please provide categoryId to register a product' });
        if (categoryId != Number(categoryId) || categoryId < 1) return res.status(400).send({ status: false, message: 'categoryId is invalid, please provide a valid categoryId to create a product' });
        if (discontinued && typeof discontinued != 'boolean') return res.status(400).send({ status: false, message: 'discontinued status is invalid, please enter a valid boolean value' });

        // validation for categoryId - 
        const categeory = await categoryModel.findOne({ categoryId: categoryId, isDeleted: false });
        if (!categeory) return res.status(404).send({ status: false, message: 'category not found with given categoryId, please enter a vlaid categoryId to create a product' });
        body.categeoryId = categeory._id;

        // chacking, whather product id is unique or not --
        const product = await productModel.findOne({ productId: productId });
        if (product) return res.status(409).send({ status: false, message: 'productId is alredy in use, please enter a unique productId to create a product' });

        // creating product -- 
        const productCreated = await productModel.create({ body });
        res.status(201).send({ status: true, message: 'product created successfully', data: productCreated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const getAllProducts = async function (req, res) {
    try {
        const allProducts = await productModel.find({ isDeleted: false }).populate('categoryId');
        if (allProducts.length == 0) return res.status(404).send({ status: false, message: 'sorry no product available at this time, please visit after some time' });
        res.status(200).send({ status: true, data: allProducts });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const getProduct = async function (req, res) {
    try {
        const productId = req.params.productId;
        if (productId != Number(productId) || productId < 1) return res.status(400).send({ status: false, message: 'productId is invalid, please provide a valid productId to find a product' });
        const product = await productModel.findOne({ productId: productId, isDeleted: false }).populate('categoryId');
        if (!product) return res.status(404).send({ status: false, message: 'produt is given productId, does not exits or deleted' });
        res.status(200).send({ status: true, data: product });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const updateProduct = async function (req, res) {
    try {
        const paramId = req.params.productId;
        if (paramId != Number(paramId) || paramId < 1) return res.status(400).send({ status: false, message: 'productId is invalid, please provide a valid productId to update a product' });
        const { productId, productName, qtyPerUnit, unitInStock, discontinued, categoryId } = body;
        if (productId && (productId != Number(productId) || productId < 1)) return res.status(400).send({ status: false, message: 'productId is invalid, please provide a valid productId to update a product' });
        if (qtyPerUnit && (qtyPerUnit != Number(qtyPerUnit) || qtyPerUnit < 1)) return res.status(400).send({ status: false, message: 'qtyPerUnit is invalid, please provide a valid qtyPerUnit to update a product' });
        if (unitInStock && (unitInStock != Number(unitInStock) || unitInStock < 1)) return res.status(400).send({ status: false, message: 'unitInStock is invalid, please provide a valid unitInStock to update a product' });
        if (categoryId && (categoryId != Number(categoryId) || categoryId < 1)) return res.status(400).send({ status: false, message: 'categoryId is invalid, please provide a valid categoryId to update a product' });
        if (discontinued && typeof discontinued != 'boolean') return res.status(400).send({ status: false, message: 'discontinued status is invalid, please enter a valid boolean value' });

        // validation for categoryId - 
        const categeory = await categoryModel.findOne({ categoryId: categoryId, isDeleted: false });
        if (!categeory) return res.status(404).send({ status: false, message: 'category not found with given categoryId, please enter a vlaid categoryId to update a product' });
        body.categeoryId = categeory._id;

        // chacking, whather product id is unique or not --
        const product = await productModel.findOne({ productId: productId });
        if (product) return res.status(409).send({ status: false, message: 'productId is alredy in use, please enter a unique productId to update a product' });

        // updating product -- 
        const productUpdated = await productModel.findOneAndUpdate({ productId: paramId, isDeleted: false }, { body }, { new: ture }).populate('categoryId');
        if (!productUpdated) return res.status(200).send({ status: true, message: 'product updated successfully', data: productUpdated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const deleteProduct = async function (req, res) {
    try {
        const productId = req.params.productId;
        if (productId != Number(productId) || productId < 1) return res.status(400).send({ status: false, message: 'productId is invalid, please provide a valid productId to find a product' });
        const productDeleted = await productModel.findOneAndUpdate({ productId: productId, isDeleted: false }, {isDeleted: true}, {new: true});
        if (!productDeleted) return res.status(404).send({ status: false, message: 'product  does not exits with given productId or deleted' });
        res.status(200).send({ status: true, message: 'product successfully deleted' });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

module.exports = {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct};