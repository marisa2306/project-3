const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
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
    jobOccupation: {
        type: String,
        default: 'unknown'
    },
    description: {
        type: String,
        default: 'unknown'
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
    },
    links: [
        {
            linkName: {
                type: String,
                default: 'School'
            },
            url: {
                type: String,
                default: 'https://www.ironhack.com/es/madrid'
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher