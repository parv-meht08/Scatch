const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minlength: 3
    },
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: Number
});

module.exports = mongoose.model('Owner', ownerSchema);