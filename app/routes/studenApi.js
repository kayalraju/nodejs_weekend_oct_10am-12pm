
const express=require('express');
const studentApiController = require('../controller/studentApiController');
const studentImageUploads = require('../helper/studentImage');

const router=express.Router();



//router.post('/create-student',studentImageUploads.single('image'),studentApiController.createStudent)
router.post('/create-student',studentApiController.createStudent)
router.get('/get-students',studentApiController.getStudents)
router.get('/get-students/:id',studentApiController.getsingleStudents)
router.put('/update-student/:id',studentApiController.updateStudent)
router.delete('/delete-student/:id',studentApiController.deleteStudent)



module.exports=router