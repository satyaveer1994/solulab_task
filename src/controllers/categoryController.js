const categoryModel = require('../models/categoryModel');

const createCategory = async function (req, res) {
    try {
        const body = req.body;
        if (!Object.keys(body).length == 0) return res.status(400).send({ status: false, message: 'please provide all required details to create a category' });
        const { categoryId, categoryName } = body;
        if (!categoryId) return res.status(400).send({ status: false, message: 'categoryId is required, please provide categoryId to create a category' });
        if (categoryId != Number(categoryId) || categoryId < 1) return res.status(400).send({ status: false, message: 'categoryId is invalid, please provide a valid categoryId to create a category' });
        if (!categoryName) return res.status(400).send({ status: false, message: 'categoryId is required, please provide categoryName to create a category' });
        if (!categoryName) return res.status(400).send({ status: false, message: 'categodyNamecategoryName is invalid, please provide a valid categoryName to create a category' });

        // unique categoryId check --
        const category = await categoryModel.findOne({ categoryId: categoryId });
        if (category) return res.status(409).send({ status: false, message: 'categoryId is already in use, please use another categoryId to create a category' });

        // creating a category --
        const categoryCreated = await categoryModel.create({ body });
        res.status(201).send({ status: true, message: 'category created sucessfully', data: { categoryId, categoryName } });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const getAllCategory = async function (req, res) {
    try {
        const allCategory = await categoryModel.find({ isDeleted: false });
        if (allCategory.length == 0) return res.status(404).send({ status: false, message: 'sorry! no category found' });
        res.status(200).send({ status: true, data: allCategory });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const updateCategory = async function (req, res) {
    try {
        const paramId = req.params.categoryId;
        if (categoryId != Number(categoryId) || categoryId < 1) return res.status(400).send({ status: false, message: 'categoryId is invalid, please provide a valid categoryId to get a category to update' });
        const body = req.body;
        const { categoryId, categoryName, ...rest } = body;
        if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: 'invalid data provided to update, please chack all fields before updating' });
        if (categoryId != Number(categoryId) || categoryId < 1) return res.status(400).send({ status: false, message: 'categoryId is invalid, please provide a valid categoryId to update a category' });
        if (!categoryName) return res.status(400).send({ status: false, message: 'categodyNamecategoryName is invalid, please provide a valid categoryName to update a categoryName' });

        // unique categoryId check --
        const category = await categoryModel.findOne({ categoryId: categoryId });
        if (category) return res.status(409).send({ status: false, message: 'categoryId is already in use, please use another categoryId to update a categoryId' });

        // updating category --
        const categoryUpdated = await categoryModel.findOneAndUpdate({ categoryId: paramId, isDeleted: false }, { query }, { new: true });
        if (!categoryUpdated) return res.status(404).send({ status: false, message: 'category could not found with given categoryId or deleted' });
        res.status(200).send({ status: false, message: 'category successfully updated', updatedData: categoryUpdated });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

const deleteCategory = async function (req, res) {
    try {
        const categoryId = req.params.categoryId;
        if (categoryId != Number(categoryId) || categoryId < 1) return res.status(400).send({ status: false, message: 'categoryId is invalid, please provide a valid categoryId to get a category to dalete' });

        // deleting a category -- 
        const categoryDeleted = await findOneAndUpdate({ categodyId: categoryId, isDeleted: false }, { isDeleted: true }, { new: true });
        if (!categoryDeleted) return res.status(404).send({ status: false, message: 'no categeory found to delete or already deleted' });
        res.status(200).send({ status: true, message: 'category successfully deleted' });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    };
};

module.exports = { createCategory, getAllCategory, updateCategory, deleteCategory }