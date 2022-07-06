const mongoose = require("mongoose")

const weaponSchema = new mongoose.Schema({
    rarity: Number,
    power: Number,
})