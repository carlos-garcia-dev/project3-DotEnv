const express = require('express')
const router = express.Router()
const uploader = require('../configs/cloudinary.config') 

router.post('/upload', uploader.single('imageUrl'), (req, res) => {
   
    if (!req.file) {
        res.status(500).json({ message: 'Error uploading the file' })
        return
    }
    
    res.json({ secure_url: req.file.path })

})


router.post('/avatar', uploader.single('avatar'), (req, res) => {
   
    if (!req.file) {
        res.status(500).json({ message: 'Error uploading the file' })
        return
    }

    res.json({ secure_url: req.file.path })

})

module.exports = router