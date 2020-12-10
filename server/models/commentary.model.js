const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require('./user.model')


const commentarySchema = new Schema({

    title: {
        type: String,
        required: true
    },

    bodyText: {
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    active: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })


const Commentary = mongoose.model('Commentary', commentarySchema)
module.exports = Commentary