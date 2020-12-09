const session = require("express-session")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const flash = require("connect-flash")
const User = require('../models/user.model')

module.exports = app => {
    app.use(session({
        secret: "eLearning",
        resave: true,
        saveUninitialized: true
    }))

    passport.serializeUser((user, next) => next(null, user._id))
    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(theUser => next(null, theUser))
            .catch(err => next(err))
    })

    app.use(flash())

    passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
        User.findOne({ username })
            .then(user => {
                if (!user) {
                    return next(null, false, { message: "Unregistered username" })
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return next(null, false, { message: "Incorrect password" })
                }
                return next(null, user)
            })
            .catch(err => res.status(500).json(err))
    }))

    app.use(passport.initialize())
    app.use(passport.session())
}