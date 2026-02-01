
const express=require('express');
const csvController = require('../controller/csvController');
const csvupload = require('../helper/csvfile');


const router=express.Router();



router.post('/create/csv',csvupload.single('file'),csvController.create);
router.get('/get/csv',csvController.getdata);




module.exports=router