const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.model')
const { isLoggedIn } = require('../middleware/custom-middleware')

router.get('/getAllUsers', (req, res) => {
    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:user_id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    User
        .findById(req.params.user_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:user_id', isLoggedIn, (req, res) => {
    User
        .findByIdAndUpdate(req.params.user_id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteUser/:user_id', isLoggedIn, (req, res) => {
    const user_id = req.params.user_id
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    User
        .findByIdAndDelete(user_id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/updateFavs/:user_id', isLoggedIn, (req, res) => {
    User
        .findByIdAndUpdate(req.params.user_id, { favorites: req.body }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/userFavs/:user_id', isLoggedIn, (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.user_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    User
        .findById(req.params.user_id)
        .populate('favorites')
        .then(response => res.json(response.favorites))
        .catch(err => res.status(500).json(err))
})


module.exports = router