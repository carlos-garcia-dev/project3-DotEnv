const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const Publication = require('../models/publication.model')
const User = require('../models/user.model')





router.get('/getAllPublications', (req, res) => {                        
    
    Publication
        .find()
        // .project('commentaries')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOnePublication/:publication_id', (req, res) => {
    
    Publication
        .findById(req.params.publication_id)
        .populate('author')
        .populate('commentaries')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getPublicationComments/:publication_id', (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.publication_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Publication
        .findOne({_id: mongoose.Types.ObjectId(req.params.publication_id)}, { title:0, subTitle:0, bodyText:0, imageUrl:0, tag:0, author:0})   
        .populate('commentaries')
        .then(response => res.json(response.commentaries))
        .catch(err => res.status(500).json(err))
})


router.post('/newPublication', (req, res) => {                  
    
    Publication 
        .create(req.body)
        .then(response => User.findByIdAndUpdate(response.author, {$push: { publications: response._id}}, {new: true} ))
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/editPublication/:publication_id', (req, res) => {     
    
    Publication
        .findByIdAndUpdate(req.params.publication_id, req.body, { useFindAndModify: false })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deletePublication/:publication_id', (req, res) => {        
    
    if (!mongoose.Types.ObjectId.isValid(req.params.publication_id)) { 
        res.status(404).json({ message: 'Invalid ID'})
        return
    }
    
    Publication
        .findByIdAndDelete(req.params.publication_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router