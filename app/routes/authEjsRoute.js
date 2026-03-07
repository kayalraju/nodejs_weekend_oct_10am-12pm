
const express = require('express');
const authEjsController = require('../controller/authEjsController');
const AuthCheck = require('../middleware/Authcheck');

//const cors=require('cors');

const Router = express.Router();




Router.get('/register/view',authEjsController.registerView)
Router.post('/register/create',authEjsController.register)
Router.get('/login/view',authEjsController.loginView)
Router.post('/login/create',authEjsController.logincreate)
Router.get('/user/dashboard',AuthCheck, authEjsController.CheckAuth,authEjsController.dashboardView)
Router.get('/logout',AuthCheck, authEjsController.CheckAuth,authEjsController.logout)




module.exports = Router;