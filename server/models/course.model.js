const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    title: String,
    description: String,
    inversions: Number,
    length: Number,
    imageUrl: String
}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)
module.exports = Course