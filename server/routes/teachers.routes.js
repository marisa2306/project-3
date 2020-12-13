const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher.model')
const { isLoggedIn, isTeacher, isValidId } = require('../middleware/custom-middleware')


router.get('/getAllTeachers', (req, res) => {
    Teacher
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getTheTeacher/:id', isValidId, (req, res) => {
    Teacher
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneTeacher/:id', isValidId, (req, res) => {
    Teacher
        .find({ user: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newTeacher', isLoggedIn, (req, res) => {
    Teacher
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editTeacher/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    Teacher
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteTeacher/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    Teacher
        .findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Teacher Deleted' }))
        .catch(err => res.status(500).json(err))
})


module.exports = router