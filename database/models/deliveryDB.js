const mongoose = require('mongoose');

var DeliverySchema = new mongoose.Schema({
    Name: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Date: {
        type: String
        //type: Date
    },
    Type: {
        type: String,
        enum: ['Residential', 'Office w/ Dispenser', 'Office w/o Dispenser']
    },
    Address: {
        type: String
    },
    GallonsOrdered: {
        type: Number
    },
    AmountDue: {
        type: String
    },
    Status: {
        type: String,
        enum: ['Cancelled', 'Pending', 'Delivered']
    },
    Remarks: {
        type: String
    }
});

module.exports = mongoose.model('DeliveryDB', DeliverySchema);