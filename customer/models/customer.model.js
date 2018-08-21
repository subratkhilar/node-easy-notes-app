const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    customerName: String,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);