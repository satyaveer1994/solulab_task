const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
        unique: true
    },
    productName: {
        type: String,
        required: true
    },
    qtyPerUnit: {
        type: Number,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    unitInStock: {
        type: Number,
        required: true
    },
    discontinued: {
        type: Boolean,
        default: false
    },
    categodyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);