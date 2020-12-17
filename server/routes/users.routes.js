const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const Teacher = require('../models/teacher.model')
const Course = require('../models/course.model')
const { isLoggedIn, isValidId } = require('../middleware/custom-middleware')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')


router.get('/getAllUsers', ensureLoggedIn(), (req, res) => {
    User
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneUser/:id', ensureLoggedIn(), isValidId, (req, res) => {
    User
        .findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/:id', ensureLoggedIn(), isValidId, (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteUser/:id', ensureLoggedIn(), isValidId, (req, res) => {
    const userId = req.params.id
    let teacherId 

    User
        .findByIdAndDelete(userId)
        .then(() => Teacher.find({ user: userId }))
        .then(res => {
            if (res.length > 0) {
                teacherId = res[ 0 ]._id
                Course.deleteMany({ owner: teacherId })
            }
        })
        .then(() => Teacher.findByIdAndDelete(teacherId))
        .then(() => res.json({ message: 'User deleted' }))
        .catch(err => res.status(500).json(err))
})

// Manage Favorites

router.put('/editUser/updateFavCourses/:id', ensureLoggedIn(), isValidId, (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { favCourses: req.body }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/userFavCourses/:id', ensureLoggedIn(), isValidId, (req, res) => {
    User
        .findById(req.params.id)
        .populate('favCourses')
        .then(response => res.json(response.favCourses))
        .catch(err => res.status(500).json(err))
})

router.put('/editUser/updateFavTeachers/:id', ensureLoggedIn(), isValidId, (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, { favTeachers: req.body }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/userFavTeachers/:id', ensureLoggedIn(), isValidId, (req, res) => {
    User
        .findById(req.params.id)
        .populate('favTeachers')
        .then(response => res.json(response.favTeachers))
        .catch(err => res.status(500).json(err))
})

module.exports = router