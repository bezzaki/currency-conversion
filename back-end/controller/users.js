const _ = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../model/User');

// -----------------------------------------------------------------------
//Post User to data base 
    const user_post = async (req,res) => {
        let user = await User.findOne({ email: req.body.email});
        if(user){
            return res.status(400).send('Email Already Registred');
        }
        user = await User.findOne({ username: req.body.username});
        if(user){
            return res .status(400).send('Username Already Registred');
        }
        user = new User(_.pick(req.body, ['username', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id','username','email'])); 
    };

// -----------------------------------------------------------------------
//Get User from data base
    const user_get = async (req,res) => {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    };

//---------------------------------------------
//export function to route Handler
module.exports = {
      user_post,
      user_get
}
