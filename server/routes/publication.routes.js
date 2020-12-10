const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Publication = require('../models/publication.model')

router.get('/getAllPublications', (req, res) => {                        
    
    Publication
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOnePublication/:publication_id', (req, res) => {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.publication_id)) {  
        res.status(404).json({ message: 'Invalid ID'})
        return
    }
    console.log(req.params.publication_id)
    Publication
        .findById(req.params.publication_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/newPublication', (req, res) => {                  
    
    Publication 
        .create(req.body)
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