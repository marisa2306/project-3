const express = require('express')
const router = express.Router()
const Teacher = require('../models/teacher.model')
const Course = require('../models/course.model')
const { check, validationResult } = require('express-validator')
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

router.post('/newTeacher', isLoggedIn,
    [
        check('name').isLength({ min: 3 }).withMessage('Name should have min 3 characters.').custom(value => {
            return Teacher.findOne({ name: value }).then(teacher => {
                if (teacher) { return Promise.reject('The name already exists, try another one') }
            })
        }),

        check('surname').isLength({ min: 3 }).withMessage('Surname should have min 3 characters.'),

        check('jobOccupation').isLength({ min: 10 }).withMessage('Write a few words that describe your profession'),

        check('description').isLength({ min: 10 }).withMessage('Description should have min 3 characters.')
        
    ], (req, res) => {
    const passCheck = validationResult(req)

    if (!passCheck.isEmpty()) {
        res.status(400).json({ message: passCheck.errors })
        return
    }
        
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
    const teacher_Id = req.params.id 
    Course
        .deleteMany({ owner: teacher_Id })
        .then(() => Teacher.findByIdAndDelete(teacher_Id))
        .then(() => res.json({ message: 'Teacher Deleted' }))
        .catch(err => res.status(500).json(err))
})


module.exports = router