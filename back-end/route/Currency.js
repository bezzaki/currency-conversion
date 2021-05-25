//Dependecies --------------------------------------------------
const express = require('express');
const cors = require('cors');
const app = express();
const auth = require('../middleware/auth.js');
app.use(express.json());
app.use(cors());
const currency_cont = require('../controller/Currency');
const user_cont = require('../controller/users');
const auth_cont = require('../controller/Auth');
//--------------------------------------------------------------
app.post('/api/currency/create',auth, currency_cont.currency_post);
app.post('/api/currency/post',auth, currency_cont.currency_postAdd);
//Route for Register and Login----------------------------------
app.post('/api/user/create', user_cont.user_post);
app.get('/api/user/me', auth, user_cont.user_get);
//login check 
app.post('/api/user/auth', auth_cont.auth_get);
//--------------------------------------------------------------
app.get('/api/currency',currency_cont.currency_get);
app.get('/api/currency/all',  currency_cont.currency_getAll);
app.put('/api/currency/refresh', currency_cont.currency_put);
app.put('/api/currency/update',auth, currency_cont.currency_modify);
app.put('/api/currency/delete',auth, currency_cont.currency_delete);

module.exports = app;
