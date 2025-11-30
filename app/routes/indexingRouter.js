
const express=require('express');
const IndexingController = require('../controller/IndexingController');
;

const router=express.Router();


router.post('/create/data',IndexingController.createData)
router.get('/get/data/:username',IndexingController.UserNameIndexing)
router.get('/get/name',IndexingController.compoundIndexing)




module.exports=router