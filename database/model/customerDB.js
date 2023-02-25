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