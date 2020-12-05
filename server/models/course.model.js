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
        default: 'Unknown',
        maxlength: 60
    },
    category: {
        type: String,
        enum: ['Design', 'Development', 'Marketing', 'Music', 'Other'],
        default: 'Other'
    },
    description: {
        type: String,
        default: 'Unknown'
    },
    whatYouWillLearn: {
        type: [String],
        default: 'Unknown'
    },
    priceRanges: [
        {
            type: { type: String },
            currency: {
                type: String,
                default: 'EUR'
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                required: true
            }
        }
    ],
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