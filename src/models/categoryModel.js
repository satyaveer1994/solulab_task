const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        required: true,
        unique: true
    },
    categoryName: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Category', categorySchema);