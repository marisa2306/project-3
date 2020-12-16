const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.model');
const { isLoggedIn, isTeacher, isValidId } = require('../middleware/custom-middleware')


router.get('/getAllComments', (req, res) => {
    Comment
        .find()
        .populate('user')
        .sort({ 'createdAt': -1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/newComment', isLoggedIn, (req, res) => {


    Comment
        .create(req.body)
        // .populate('user')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


router.put('/editComment/:id', isLoggedIn, isTeacher, (req, res) => {

    Comment
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})




module.exports = router;