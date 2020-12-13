const mongoose = require('mongoose')

module.exports = {
  isLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.status(403).json({ message: 'Log in to access' }),
  isTeacher: (req, res, next) => req.user.role === 'Teacher' ? next() : res.status(403).json({ message: 'Unauthorized' }),
  isAdmin: (req, res, next) => req.user.role === 'Admin' ? next() : res.status(403).json({ message: 'Unauthorized' }),
  isValidId: (req, res, next) => mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.status(404).json({ message: 'Invalid ID' })
}