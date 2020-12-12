const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Teacher = require('../models/teacher.model')
const { isLoggedIn, isTeacher } = require('../middleware/custom-middleware')


router.get('/getAllTeachers', (req, res) => {
    Teacher
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getTheTeacher/:teacher_id', (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.teacher_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Teacher
        .findById(req.params.teacher_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneTeacher/:user_id', (req, res) => {
    const userId = req.params.user_id

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Teacher
        .find({ user: userId })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newTeacher', isLoggedIn, (req, res) => {
    Teacher
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editTeacher/:teacher_id', isLoggedIn, isTeacher, (req, res) => {
    Teacher
        .findByIdAndUpdate(req.params.teacher_id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteTeacher/:teacher_id', isLoggedIn, isTeacher, (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.teacher_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Teacher
        .findByIdAndDelete(req.params.teacher_id)
        .then(() => res.json({ message: 'Teacher Deleted' }))
        .catch(err => res.status(500).json(err))
})


module.exports = router