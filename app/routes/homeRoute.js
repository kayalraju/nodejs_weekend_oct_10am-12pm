const express = require('express');
const homeController = require('../controller/homeController');

const router = express.Router();



// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

router.get('/',homeController.index)
router.get('/about',homeController.about)

module.exports = router;