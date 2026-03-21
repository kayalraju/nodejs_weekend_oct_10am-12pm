
const express=require('express');
const studentApiController = require('../controller/studentApiController');
const studentImageUploads = require('../helper/studentImage');

const router=express.Router();



//router.post('/create-student',studentImageUploads.single('image'),studentApiController.createStudent)
/**
* @swagger
* /api/create-student:
*   post:
*     summary: create Student
*     tags:
*       - Student
*     produces:
*       - application/json
*     parameters:
 *      - in: body
 *        name: Add student
 *        description: Add student in MongoDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - phone
 *            - address
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            address:
 *              type: string
 *     responses:
 *        201:
 *          description: student data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
router.post('/create-student',studentApiController.createStudent)
/**
 * @swagger
 * /api/get-students:
 *  get:
 *    summary: Get all the student from Database
 *    tags:
 *       - Student
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: data fetched successfully.
 */
router.get('/get-students',studentApiController.getStudents)
router.get('/get-students/:id',studentApiController.getsingleStudents)
router.put('/update-student/:id',studentApiController.updateStudent)
router.delete('/delete-student/:id',studentApiController.deleteStudent)



module.exports=router