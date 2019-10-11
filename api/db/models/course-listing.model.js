 const mongoose = require('mongoose');

const CourseListingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    courseCode: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }

})

const CourseListing = mongoose.model('CourseListing', CourseListingSchema);

module.exports = { CourseListing }