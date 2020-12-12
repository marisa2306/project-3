const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcryptjs")
const bcryptSalt = 10
const User = require("../models/user.model")
const { check, validationResult } = require('express-validator')


router.post('/signup',
    [
        check('username').isLength({ min: 5 }).withMessage('Name should have min 5 characters.').custom(value => {
            return User.findOne({ username: value }).then(user => {
                if (user) { return Promise.reject('The username already exists') }
            })
        }),

        check('email').isEmail().withMessage('Invalid email').custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) { return Promise.reject('Email in use') }
            })
        }),

        check('password').isLength({ min: 4 }).withMessage('Password min 4 characters').matches(/\d/).withMessage('Password must contain a number'),

        check('role').isIn(['Student', 'Teacher']).withMessage('You must choose a role')
    ],
    (req, res) => {
        const passCheck = validationResult(req)

        if (!passCheck.isEmpty()) {
            res.status(400).json({ message: passCheck.errors })
            return
        }

        const { name, surname, username, password, email, role } = req.body

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        User
            .create({ name, surname, username, password: hashPass, email, role })
            .then(newUser => req.login(newUser, err => err ? res.status(500).json({ message: 'Login error' }) : res.status(200).json(newUser)))
            .catch(() => res.status(500).json({ message: 'Error saving user to DB. Please try again.' }))
    })

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            res.status(500).json({ message: 'Error authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))

    })(req, res, next)
})

router.post('/logout', (req, res) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' });
})

router.get('/loggedin', (req, res) => req.isAuthenticated() ? res.status(200).json(req.user) : res.status(403).json({ message: 'Unauthorized' }))


module.exports = router