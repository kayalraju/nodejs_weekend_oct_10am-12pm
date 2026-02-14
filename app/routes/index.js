
const express=require('express');

const router=express.Router();
const AuthRouter=require('./authRouter');
const HomeRouter=require('./homeRoute');
const StudentApiRouter=require('./studenApi');
const StudentEjsRouter=require('./studentEjsRoute');
const IndexingRouter=require('./indexingRouter');
const CsvRouter=require('./csvRoute');
const ComparisonRouter=require('./ComparisonRoute');



router.use('/auth',AuthRouter);
router.use(HomeRouter);
router.use('/student',StudentApiRouter);
router.use('/studentEjs',StudentEjsRouter);
router.use('/indexing',IndexingRouter);
router.use('/csv',CsvRouter);
router.use('/comparison',ComparisonRouter);

module.exports=router