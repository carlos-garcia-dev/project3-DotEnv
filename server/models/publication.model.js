const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require('./user.model')
const Commentary = require('./commentary.model')


const publicationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    subTitle: {
        type: String,
        required: true
    },

    bodyText: {
        type: String,
        required: true
    },

    imageUrl: {
        type: [String],
        required: true,
        min: 1
    },
    
    tag: [{
        type: String,
        enum: ['Web design', 'Cybersecurity', 'Data analytics', 'Digital marketing', 'UX / UI design', 'Dev tools']
    }],

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    commentaries: [{
        type: Schema.Types.ObjectId,
        ref: 'Commentary'
    }]

}, { timestamps: true })

const Publication = mongoose.model('Publication', publicationSchema)
module.exports = Publication