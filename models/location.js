const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const LocationSchema = new Schema({
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number],
        index: '2dshpere'
    }
})


module.exports = LocationSchema;