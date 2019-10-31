const mongoose = require('mongoose');

const RequirementsSchema = new mongoose.Schema({
    

})

const Requirements= mongoose.model('Requirements', RequirementsSchema);

module.exports = { Requirements}