const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    _id: String,
    work: Number,
    crime: Number,
    rent: Number,
    spin: Number
})

module.exports = mongoose.model('times', timeSchema)

