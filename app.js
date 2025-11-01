require('dotenv').config();
const express = require('express');
const app = express();

//http request methods are get, post, put/patch, delete
// app.get('/',(req,res)=>{
//     res.send('Hello World!');
// })

// app.get('/about',(req,res)=>{
//     res.send('About Us Page');
// })

// app.get('/contact',(req,res)=>{
//     res.send('Contact Us Page');
// })


const homeRoute=require('./app/routes/homeRoute')
app.use(homeRoute);

const PORT=process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});