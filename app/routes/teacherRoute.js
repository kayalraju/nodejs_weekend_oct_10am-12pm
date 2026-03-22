
const express=require('express');
const TeacherController = require('../controller/TeacherController');



const router=express.Router();


router.post('/create/teacher',TeacherController.createTeacher)




module.exports=router