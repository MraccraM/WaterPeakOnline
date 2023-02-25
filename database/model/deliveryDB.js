const mongoos = require('mongoose');

var CustomerSchema = new mongoose.schema({
    CustomerID: {
        type: Number
    },
    Name: {
        type: String
    },
    PhoneNumber: {
        type: String
    },
    Date: {
        type: Date
    },
    Type: {
        type: String,
        enum: ['Residential', 'Office A', 'Office B']
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

module.exports = mongoose.model('CustomerDB', CustomerSchema);