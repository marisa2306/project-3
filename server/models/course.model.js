const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    imageUrl: {
        type: String,
        default: 'https://res.cloudinary.com/dodneiokm/image/upload/v1607526920/project3-ironhack/nmg7ekkdtros17ietzbc.jpg'
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
    difficultyLevel: {
        type: String,
        enum: ['Beginner', 'Intermidiate', 'Advanced'],
        default: 'Beginner'
    },
    description: {
        type: String,
        default: 'Unknown'
    },
    whatYouWillLearn: {
        type: [String],
        default: 'Unknown'
    },
    // priceRanges: {
    //     currency: {
    //         type: String,
    //         default: 'EUR'
    //     },
    //     min: {
    //         type: Number,
    //         default: 0
    //     },
    //     max: {
    //         type: Number,
    //         default: 200
    //     }
    // },
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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }
}, { timestamps: true })



const Course = mongoose.model('Course', courseSchema)

module.exports = Course