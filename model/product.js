const mongoose = require('mongoose')
const { images } = require('../utils/cloudinary')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    rating: {default: 0}, Number,
    category: String,
    products: [{
        product_name: String,
        product_img: String,
        product_img_id: String,
    }],
    description: String,
    timestamp: Date,
}, {collection: 'User'})

const model = mongoose.model('User', userschema)
module.exports = model