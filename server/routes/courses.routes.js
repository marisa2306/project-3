const express = require('express')
const router = express.Router()
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

router.post('/newCourse', isLoggedIn, isTeacher, (req, res) => {
    const { imageUrl, title, lead, category, difficultyLevel, description, whatYouWillLearn, price, requirements, videos, duration, owner } = req.body
    const mainTopicsArr = whatYouWillLearn.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))
    const requirementsArr = requirements.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1))
    const videosArr = videos.split(', ')

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

    // const mainTopicsArr = typeof whatYouWillLearn === 'string' ? whatYouWillLearn.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : whatYouWillLearn
    // const requirementsArr = typeof requirements === 'string' ? requirements.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : requirementsArr

    const mainTopicsArr = typeof whatYouWillLearn === 'string' ? whatYouWillLearn.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : typeof whatYouWillLearn === 'array' ? whatYouWillLearn.map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : whatYouWillLearn
    const requirementsArr = typeof requirements === 'string' ? requirements.split(', ').map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : typeof requirements === 'array' ? requirements.map(elm => elm.charAt(0).toUpperCase() + elm.substring(1)) : requirements
    const videosArr = videos.split(', ')

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