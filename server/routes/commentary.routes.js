const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const Commentary = require('../models/commentary.model')
const Publication =  require('../models/publication.model')
const User = require('../models/user.model')





router.get('/getAllComments', (req, res) => {                        
    
    Commentary
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneComment/:commentary_id', (req, res) => {

    Commentary
        .findById(req.params.commentary_id)
        // .populate('author')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/editComment/:commentary_id', (req, res) => {     
    
    Commentary
        .findByIdAndUpdate(req.params.commentary_id, req.body, { useFindAndModify: false })
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
        
            return Promise.all([publicationPromise, userPromsise])
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteComment/:commentary_id', (req, res) => {        
    
    if (!mongoose.Types.ObjectId.isValid(req.params.commentary_id)) { 
        res.status(404).json({ message: 'Invalid ID'})
        return
    }
    
    Commentary
        .findByIdAndDelete(req.params.commentary_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

module.exports = router