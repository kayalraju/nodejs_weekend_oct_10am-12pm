const express = require('express');
const AuthController = require('../controller/AuthController');
const AuthCheck = require('../middleware/auth');

const Router = express.Router();



Router.post('/register',AuthController.register)
Router.post('/login',AuthController.login)
Router.get('/dashboard',AuthCheck,AuthController.dashboard);



module.exports = Router;