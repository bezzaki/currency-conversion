//Dependecies-------------------------------
const mongoose = require('mongoose');
//------------------------------------------
const currencySchema = new mongoose.Schema
({
        from: {type: String,require: true},
        to: {type: String,require: true},
        val: {type: Number,require: true},
});
const Curren = mongoose.model('Currency',currencySchema);
//------------------------------------------
module.exports = Curren;