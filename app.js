require('dotenv').config();
const express = require('express');
const ejs=require('ejs');
const path = require('path');
const connectDB = require('./app/config/db');




const app = express();

//call db
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
//define static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/uploads',express.static('uploads'));

const homeRoute=require('./app/routes/homeRoute')
app.use(homeRoute);

const authRoute=require('./app/routes/authRouter')
app.use('/api',authRoute);

const studentApiRoute=require('./app/routes/studenApi')
app.use('/api',studentApiRoute);
const IndexingRoute=require('./app/routes/indexingRouter')
app.use(IndexingRoute); 

const studentEjsRoute=require('./app/routes/studentEjsRoute')
app.use(studentEjsRoute);

const csvroute=require('./app/routes/csvRoute')
app.use('/api',csvroute);   

const PORT=process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});