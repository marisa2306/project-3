const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const { isLoggedIn, isValidId } = require('../middleware/custom-middleware')        // TO-DO ==> da server error

router.get('/getAllUsers', (req, res) => {
    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:id', isValidId, (req, res) => {
    User
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:id', isLoggedIn, isValidId, (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteUser/:id', isLoggedIn, isValidId, (req, res) => {
    User
        .findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/updateFavs/:id', isLoggedIn, isValidId, (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { favorites: req.body }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/userFavs/:id', isLoggedIn, isValidId, (req, res) => {
    User
        .findById(req.params.id)
        .populate('favorites')
        .then(response => res.json(response.favorites))
        .catch(err => res.status(500).json(err))
})


module.exports = router