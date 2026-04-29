const express = require('express')
const dotenv = require('dotenv')

const User = require('../model/staff')
const Cloudinary = require('../utils/cloudinary')
const Uploader = require('../utils/multer')

const router = express.Router()
dotenv.config()

// endpoint to upload photos
router.post('/upload_photos', Uploader.array('images', 10), async (req, res) => {

        if (!req.files || req.files.length === 0) {
            return res.status(400).send({ status: 'error', msg: 'No files uploaded' })
        }

        let profile = await User.findById(userId);

        if (!profile) {
            return res.status(404).send({ status: 'error', msg: 'User not found' })
        }

        const uploadedPhotos = []

    // Upload each selected file to Cloudinary
        for (const file of req.files) {
            const upload = await Cloudinary.uploader.upload(file.path, {
                folder: "media/photos"
            })

            profile.images.push({
                img_url: upload.secure_url,
                img_id: upload.public_id
            })

            uploadedPhotos.push(upload)
        }

        await profile.save()

        return res.status(200).send({ status: 'ok', msg: 'success', file: uploadedPhotos, profile })
    
})

    
module.exports = router