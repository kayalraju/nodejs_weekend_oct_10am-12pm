const express = require('express');
const lookupController = require('../controller/LopkupController');

const router = express.Router();


router.post('/create/category',lookupController.createCategory)
router.get('/category',lookupController.getCategory)
router.post('/create/subcategory',lookupController.createsubCategory)
router.get('/subcategory',lookupController.getsubCategory)


module.exports = router;