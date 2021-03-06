
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tag: {
        type: String,
        required: true
    },
    credits: {
        type: [Number],
        required: true
    },
    year: {
        type: Number,
        required: true,
        max: 4
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }

})

const Course = mongoose.model('Course', CourseSchema);

module.exports = { Course }