const mongoose = require('mongoose')
const { images } = require('../utils/cloudinary')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    rating: {default: 0}, Number,
    category: String,
    products: [{
        product_name: String,
        product_img: String,
        product_img_id: String,
    }],
    description: String,
    timestamp: Date,
}, {collection: 'Product'})

const model = mongoose.model('Product', productschema)
module.exports = model