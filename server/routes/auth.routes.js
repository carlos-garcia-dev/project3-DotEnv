const express = require('express')
const router = express.Router()
const passport = require('passport')


const bcrypt = require('bcrypt')
const bcryptSalt = 10


const User = require('../models/user.model')



router.post('/signup', (req, res) => {

    const { name, username, email, password } = req.body

    if (!username || !password || !email || !name) {
        res.status(400).json({ message: 'Fill the user and password fields' })
        return
    }

    if (password.length < 6 ) {
        res.status(400).json({ message: 'Password not secure' })
        return
    }


    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.status(400).json({ message: 'User already exists' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, email, name, password: hashPass })
                .then(newUser => req.login(newUser, err => err ? res.status(500).json({message: 'It was not possible to sign up'}) : res.status(200).json(newUser)))
                .catch(() => res.status(500).json({ message: 'It was not possible to create the user.' }))
        })
})


router.post('/signin', (req, res) => {

    passport.authenticate('local', (err, user, failure) => {
        
        if (err) {
            res.status(500).json({ mesage: 'It was not possible to authenticate' })
            return
        }

        if (!user) {
            res.status(401).json(failure)
        }

        req.login(user, err => err ? res.status(500).json({message: 'Error in session'}) : res.status(200).json(user))

    })(req, res)
})


router.post('/signout', (req, res) => {
    req.logout()
    res.status(200).json({message: 'Signned out succesfully'})
})


router.get('/signnedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Not enough permissions' }))


module.exports = router