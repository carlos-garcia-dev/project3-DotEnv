const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const Publication = require('../models/publication.model')
const User = require('../models/user.model')


const checkId = require('../middlewares/middlewares.js')


router.get('/getAllPublications', (req, res) => {                        
    
    Publication
        .find()
        // .find({}, ${project:{})
        // .${project('commentaries')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOnePublication/:id', checkId, (req, res) => {
    
    Publication
        .findById(req.params.id)
        .populate('author')
        .populate('commentaries')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getPublicationComments/:id', checkId, (req, res) => {

    Publication
        .findOne({_id: mongoose.Types.ObjectId(req.params.id)}, { title:0, subTitle:0, bodyText:0, imageUrl:0, tag:0, author:0})   
        .populate('commentaries')
        .then(response => res.json(response.commentaries))
        .catch(err => res.status(500).json(err))
})


router.post('/newPublication', (req, res) => {                  
    
    Publication 
        .create(req.body)
        .then(response => User
                            .findByIdAndUpdate(response.author, { $push: { publications: response._id } }, { new: true }, { useFindAndModify: false })
                            .populate('publications'))
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/editPublication/:id', checkId, (req, res) => {     
    
    Publication
        .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deletePublication/:id', checkId, (req, res) => {        
    
    Publication
        .findByIdAndDelete(req.params.id, { useFindAndModify: false })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router