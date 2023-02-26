const mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Address: {
        type: String
    },
    Type: {
        type: String,
        enum: ['Residential', 'Office A', 'Office B']
    },
    Remarks: {
        type: String
    }
});

module.exports = mongoose.model('CustomerDB', CustomerSchema);