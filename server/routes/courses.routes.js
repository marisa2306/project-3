const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Course = require('../models/course.model')
const { isLoggedIn, isTeacher, isValidId } = require('../middleware/custom-middleware')


router.get('/sampleCourses', (req, res) => {
    Course
        .aggregate([{ $sample: { size: 8 } }])
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getAllCourses', (req, res) => {
    Course
        .find()
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getTeacherCourses/:id', isValidId, (req, res) => {
    Course
        .find({ owner: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.get('/getOneCourse/:id', isValidId, (req, res) => {
    Course
        .findById(req.params.id)
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.post('/newCourse', isLoggedIn, isTeacher,
    [
        check('title').isLength({ min: 10 }).withMessage('Title should have min 10 characters.').custom(value => {
            return Course.findOne({ title: value }).then(course => {
                if (course) { return Promise.reject('The title already exists, try another one') }
            })
        }),

        check('lead').isLength({ min: 5 }).withMessage('Enter any lead paragraph field'),

        check('description').isLength({ min: 20 }).withMessage('Write a few words that describe your course'),

        check('whatYouWillLearn').isLength({ min: 5 }).withMessage('Include some topics'),
        
        check('requirements').isLength({ min: 5 }).withMessage('Include some requirements'),

        check('category').isIn([ 'Design', 'Development', 'Marketing', 'Music', 'Other' ]).withMessage('You must choose a category'),

        check('difficultyLevel').isIn([ 'Beginner', 'Intermidiate', 'Advanced', 'All levels' ]).withMessage('You must choose a level'),

        check('videos').isLength({ min: 8 }).withMessage('Include some links')
        
    ], (req, res) => {
    const passCheck = validationResult(req)

    if (!passCheck.isEmpty()) {
        res.status(400).json({ message: passCheck.errors })
        return
    }
        
    const { imageUrl, title, lead, category, difficultyLevel, description, whatYouWillLearn, price, duration, requirements, videos, owner } = req.body
    
    const mainTopicsArr = whatYouWillLearn.split(',').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))
    const requirementsArr = requirements.split(',').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))
    const videosArr = videos.split(',')

    Course
        .create({
            imageUrl,
            title,
            lead,
            category,
            difficultyLevel,
            description,
            whatYouWillLearn: mainTopicsArr,
            price,
            requirements: requirementsArr,
            videos: videosArr,
            duration,
            owner
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.put('/editCourse/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    const { imageUrl, title, lead, category, difficultyLevel, description, whatYouWillLearn, price, videos, requirements, duration, owner } = req.body

    const mainTopicsArr = typeof whatYouWillLearn === 'string' ? whatYouWillLearn.split(',').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : whatYouWillLearn
    const requirementsArr = typeof requirements === 'string' ? requirements.split(',').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : requirements
    const videosArr = typeof videos === 'string' ? videos.split(',') : videos

    Course
        .findByIdAndUpdate(req.params.id, {
            imageUrl,
            title,
            lead,
            category,
            difficultyLevel,
            description,
            whatYouWillLearn: mainTopicsArr,
            price,
            requirements: requirementsArr,
            videos: videosArr,
            duration,
            owner
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteTeacherCourses/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    Course
        .deleteMany({ owner: req.params.id })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteCourse/:id', isLoggedIn, isTeacher, isValidId, (req, res) => {
    Course
        .findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Course Deleted' }))
        .catch(err => res.status(500).json(err))
})


module.exports = router