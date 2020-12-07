const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Course = require('../models/course.model')


router.get('/getAllCourses', (req, res) => {

    Course
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



router.get('/getTeacherCourses/:teacher_id', (req, res) => {

    const teacherId = req.params.teacher_id

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Course
        .find({ owner: teacherId })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})




router.get('/getOneCourse/:course_id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.course_id)) {
        res.status(404).json({ message: 'Invalid ID' })
        return
    }

    Course
        .findById(req.params.course_id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newCourse', (req, res) => {

    Course
        .create(req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCourse/:course_id', (req, res) => {

    Course
        .findByIdAndUpdate(req.params.course_id, req.body)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.delete('/deleteCourse/:course_id', (req, res) => {

    Course
        .findByIdAndDelete(req.params.course_id)
        .then(() => res.json({ message: 'Course Deleted' }))
        .catch(err => res.status(500).json(err))
})




module.exports = router