const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    _id: String,
    money: Number,
    items: [{
        type: mongoose.Schema.Types.Mixed,
        lowercase: true
    }],
    houses: [{
        type: mongoose.Schema.Types.Mixed,
        lowercase: true
    }]

});

module.exports = mongoose.model('users', userSchema)