const express = require('express');
const AuthController = require('../controller/AuthController');
const AuthCheck = require('../middleware/auth');
//const cors=require('cors');

const Router = express.Router();

//Router.use(cors());

// const gello=async(req,res,next)=>{
//   const agent=req.headers['user-agent'];
//   console.log('agent',agent);
//     next();
// }


Router.post('/register',AuthController.register)
Router.post('/verify/account',AuthController.verifyAccount)
Router.post('/login',AuthController.login)
Router.get('/dashboard',AuthCheck,AuthController.dashboard);

Router.post('/reset-password-link',AuthController.resetPasswordLink);
Router.post('/reset-password/:id/:token',AuthController.resetPassword);



module.exports = Router;