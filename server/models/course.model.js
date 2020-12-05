const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseImg: {
        imageName: String,
        path: {
            type: String,
            default: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8'
        },
        originalName: String
    },
    title: {
        type: String,
        unique: true,
        required: true,
        default: 'unknown',
        maxlength: 60
    },
    category: {
        type: String,
        enum: ['Design', 'Development', 'Marketing', 'Music'],
        default: 'unknown'
    },
    description: {
        type: String,
        default: 'unknown'
    },
    whatYouWillLearn: {
        type: [String],
        default: 'unknown'
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    requirements: {
        type: [String],
        default: 'unknown'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
}, { timestamps: true })



const Course = mongoose.model('Course', courseSchema)

module.exports = Course