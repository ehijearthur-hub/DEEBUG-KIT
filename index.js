const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI)
const connection = mongoose.connection
connection.on('open', error =>{
    if(error) {
        console.log(`Error connecting to database ${error}`)
    } else {
        console.log("Database connected successfully")
    }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT
app.listen(port , ()=> {
    console.log(`server listening at port ${port}`);
})

module.exports = app