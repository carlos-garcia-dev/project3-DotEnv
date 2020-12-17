const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Commentary = require('./commentary.model')
const Publication = require('./publication.model')


const userSchema = new Schema({

    name: {
        type: String,
        // match: /^[a-z ,.'-]+$/i,
        // min: 5,
        required: true
    },    

    username: {
        type: String,
        // match: /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/,
        required: true,
    },

    email: {
        type: String,
        // match: /^\S+@\S+\.\S+$/,
        required: true
    },
    
    password: {
        type: String,
        // match: /^[a-zA-Z0-9_]{6,}[a-zA-Z]+[0-9]*$/,
        required: true
    },

    userType: {
        type: String,
        enum: ['User', 'Company', 'Admin'],
        default: 'User',
    },

    active: {
        type: Boolean,
        default: true
    },


    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/manager00/image/upload/v1608205545/Avatars/unsplash0_tyfojr.png'
    },

    // phone: {
    //     type: String,
    //     match: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    // },

    // socialAccount: {
    //     type: [String],
    //     enum: ['Medium', 'LinkedIn', 'Behance']
    // },
    
    // inbox: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Commentary'
    // }],

    publications: [{
        type: Schema.Types.ObjectId,
        ref: 'Publication'
    }],

    commentaries: [{
        type: Schema.Types.ObjectId,
        ref: 'Commentary'
    }],

}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User