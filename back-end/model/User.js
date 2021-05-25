//Dependecies-------------------------------
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const _ = require('lodash');
//------------------------------------------
const userSchema = new mongoose.Schema
({
        username: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
            unique: true,
            index: true 
        },
        email: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 255,
            unique: true,
            index:true,
            sparse:true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024,
        },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ "_id": this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

//------------------------------------------
module.exports = User;