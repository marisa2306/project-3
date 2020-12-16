const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
    },
    title: {
        type: String,
        unique: true,
        required: true,
        maxlength: 60
    },
    lead: String,
    category: {
        type: String,
        enum: ['Design', 'Development', 'Marketing', 'Music', 'Other'],
        default: 'Other'
    },
    difficultyLevel: {
        type: String,
        enum: ['Beginner', 'Intermidiate', 'Advanced', 'All levels'],
        default: 'All levels'
    },
    description: {
        type: String,
        default: 'Unknown'
    },
    whatYouWillLearn: {
        type: [String],
        default: 'Unknown'
    },
    price: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    requirements: {
        type: [String],
        default: 'unknown'
    },
    videos: {
        type: [String],
        default: 'https://www.youtube.com/watch?v=I_jSd4Wf7ck'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
}, { timestamps: true })



const Course = mongoose.model('Course', courseSchema)

module.exports = Course