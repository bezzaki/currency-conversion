const User = require('../model/User');
const bcrypt = require('bcrypt');

const auth_get = async (req,res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.send(false);
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.send(false);
    const token = user.generateAuthToken();
    res.send(token);
}
module.exports = {
    auth_get
}
