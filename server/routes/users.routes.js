const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user.model')


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

//CREATE NEW USER SIGN UP FORM

router.put('/editUser/:user_id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.user_id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//DELETE USER Role Admin


module.exports = router