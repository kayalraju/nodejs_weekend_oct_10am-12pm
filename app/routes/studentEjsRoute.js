
const express=require('express');
const StudentEjsController = require('../controller/StudentEjsController');


const router=express.Router();


router.get('/student/list',StudentEjsController.list)
router.get('/add/student',StudentEjsController.addView)
router.post('/create/student',StudentEjsController.createStudent)




module.exports=router