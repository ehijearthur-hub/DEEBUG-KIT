const express = require('express');
const router = express.Router();
const Staff = require('../model/Staff');
const bcrypt = require('bcryptjs');


router.get('/fetch-all staffs', async (req, res) => {
    try {
        const staffs = await Staff.find().sort({ createdAt: -1 });
        return res.status(200).send({ status: 'ok', msg: 'success', data: staffs })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error occured', error: e.message });
    }
});

// Create new staff
router.post('/create-staff', async (req, res) => {
    const { name, email, password, role, department } = req.body;

    if (!name || !email || !password || !role || !department ) {
        return res.status(400).send
    }
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const staff = await Staff.create ({
            name, 
            email,
            password: hashedPassword,
            role,
            department
        });
        
      return res.status(201).send({ status: 'ok', msg: 'success', data: staff });
    } catch  (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'same error ocurred', error: e.message });
    }
});

// Edit staff 
router.put('/edit-staff/;id', async (req, res) => {
    try{
    let updateData = { ...req.body };
    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    const staff = await Staff.findByIdAndUpdate(req.params.id,
        updateData, {
            new: true,
            runValidators: true
        });

        if (!staff) {
            return res.status(404).send({ status: 'error', msg: 'Staff not found' });
        }
        return res.status(200).send({ status: 'ok', msg: 'success'});
    } catch (e) {
        console.error(e);
        return res.staus(500).send({ staus:'error', msg: 'some error ocurred', error: e.message });
    }
});

// Delete staff 
router.delete('/delete-staff/;id', async (req, res) => {
    try {
        console.log(req)
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).send({ status: 'error', msg: 'Staff not found' });
        }
        return res.status(200).send({ status: 'ok', msg: 'success' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ status: 'error', msg: 'some error occurred', error: e.message });
    }
});

module.exports = router;