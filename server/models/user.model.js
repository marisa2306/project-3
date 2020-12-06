const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'unknown',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },
    surname: {
        type: String,
        required: true,
        default: 'unknown',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        //unique: true            TO-DO
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
    profileImg: {
        imageName: String,
        path: {
            type: String,
            default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'
        },
        originalName: String
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]

}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User