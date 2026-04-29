const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema ({
    fullname: String,
    email: String,
    role: { type: String,
        enum: ["Staff", "Manager", "Admin"]
    }, 
    department: String,
}, {timestamps: true}, {collection: 'Staff'})

const model = mongoose.model('Staff', staffSchema)
module.exports = model