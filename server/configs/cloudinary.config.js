const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})




const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Project3',
        format: async (req, file) => 'png',  //'jpeg', 'jfif', 'jpg', 'jpeg2000', 'gif'
    }
})

const uploadCloud = multer({ storage: storage });




const storageAvatar = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ProAvatars',
        format: async (req, file) => 'png',  //'jpeg', 'jfif', 'jpg', 'jpeg2000', 'gif'
    }
})

const uploadCloudAvatar = multer({ storage: storageAvatar });


module.exports = uploadCloud
module.exports = uploadCloudAvatar