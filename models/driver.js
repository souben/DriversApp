const mongoose = require('mongoose');
const LocationSchema = require('./location');
const Schema = mongoose.Schema;
const DriverSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    driving:{
        type: Boolean,
        default: false
    },
    location: LocationSchema

})

module.exports = mongoose.model('driver', DriverSchema);