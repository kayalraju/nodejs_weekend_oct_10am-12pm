const express=require('express');
const ComparisonController = require('../controller/ComparisonController');

const router=express.Router();




router.post('/create/comp',ComparisonController.createinv)
router.get('/eq',ComparisonController.eq )

module.exports=router