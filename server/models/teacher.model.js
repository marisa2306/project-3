const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    jobOccupation: {
        type: String,
        default: 'unknown'
    },
    description: {
        type: String,
        default: 'unknown'
    },
    links: [
        {
            name: {
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


