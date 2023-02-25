const mongoos = require('mongoose');

var TypeSchema = new mongoose.schema({
    type: {
        type: String,
        enum: ['Residential', 'Office A', 'Office B']
    }
});

module.exports = mongoose.model('TypeDB', TypeSchema);