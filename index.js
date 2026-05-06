const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// load env vars 
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
const connection = mongoose.connection
connection.on('open', error =>{
    if(error) {
        console.log(`Error connecting to database ${error}`)
    } else {
        console.log("Database connected successfully")
    }
})

const app = express()
app.use(express.json())
app.use(cors())

// Routes 
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/staffs', require('./routes/staffRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));

const port = process.env.PORT
app.listen(port , ()=> {
    console.log(`Server listening at port ${port}`);
})

module.exports = app