const express = require('express');
const router = express.Router();
const product = require('../model/product');
const bcrypt = require('bcrypt.js');



// Add new products 
router.get('/add-product', async (req, res) =>{
    try {
        const product = await product.find().sort({ createdAt: -1 });
        return res.status(200).send({ status: 'ok', msg: 'success', data: product })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error ocurred', error: e.message });
    }
});


// Create new products 
router.post('/create-product', async (req, res) =>{
    const { rating, category, products, description } = req.body;

    if (!rating || !category || !products || description ) {
        try {
            const product = await product.create ({
                rating,
                category,
                products,
                decription
            });

            return res.status(201).send({ status: 'ok', msg: 'success', data: product });
        } catch (e) {
            console.error(e);
            return res.status(500).send({ status: 'error', msg: 'same error ocurred', error: e.message });
        }
    }
});


// Edit product 
router.put('/edit-product/;id', async (req, res) => {
    try{
        let updateData = { ...req.body };
    if (!product) const staff = await product.findByIdAndUpdate(req.params.id,
        updateData, {
            new: true,
            runValidators: true
        });
    if (!product) {
        return res.status(404).send({ status: 'error', msg: 'Product not found' });
    }
    return res.status(200).send({ status: 'ok', msg: 'success'});
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error ocurred', error: e.message });
    }
});



// Delete products 
router.delete('/delete-product/;id', async (req, res) => {
    try {
        console.log(req)
        const product = await product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ status: 'error', msg: 'Product not found' });
        }
        return res.status(200).send({ status: 'ok', msg: 'success' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error occurred', error: e.message });
    }
});


module.export = router;


















        




    
    










