const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher', 'Admin'],
        default: 'Student'
    },
    imageUrl: {
        type: String,
        default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'
    },
    favCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    favTeachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }]

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User