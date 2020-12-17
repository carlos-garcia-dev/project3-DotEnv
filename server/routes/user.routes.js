const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const checkId = require('../middlewares/middlewares')


const User = require('../models/user.model')



router.get('/getAllUsers', (req, res) => {                        
    
    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.get('/getOneUser/:id', checkId, (req, res) => {
    
    User
        .findById(req.params.id)
        .populate('publications')
        .populate('commentaries')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.put('/editUser/:id', checkId, (req, res) => {     
    
    User
        .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteUser/:id', checkId, (req, res) => {        
    
    User
        .findByIdAndDelete(req.params.id, { useFindAndModify: false })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router