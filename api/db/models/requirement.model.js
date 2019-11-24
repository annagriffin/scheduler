const mongoose = require('mongoose');

const RequirementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        value: false
    }
})

const Requirement = mongoose.model('Requirement', RequirementSchema);
module.exports = { Requirement };