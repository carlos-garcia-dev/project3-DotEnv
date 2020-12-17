const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const Commentary = require('../models/commentary.model')
const Publication =  require('../models/publication.model')
const User = require('../models/user.model')


const checkId = require('../middlewares/middlewares')




router.get('/getAllComments', (req, res) => {                        
    
    Commentary
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneComment/:id', checkId, (req, res) => {

    Commentary
        .findById(req.params.id)
        .populate('author')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/editComment/:id', checkId, (req, res) => {     
    
    Commentary
        .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/newComment', (req, res) => {
    
    const { title, bodyText, author, publicationId } = req.body

    Commentary
        .create({title, bodyText, author})
        .then(response => {
            const userPromsise = User.findByIdAndUpdate(response.author, { $push: { commentaries: response._id } }, { new: true }).populate('publications')
            const publicationPromise = Publication.findByIdAndUpdate(publicationId, {$push: {commentaries: response._id}}, { new: true })
        
            return Promise.all([publicationPromise, userPromsise])})
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteComment/:id', checkId, (req, res) => {        

    Commentary
        .findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router