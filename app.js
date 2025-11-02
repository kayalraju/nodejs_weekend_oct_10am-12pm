require('dotenv').config();
const express = require('express');
const ejs=require('ejs');
const path = require('path');

const app = express();
//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
//define static folder
app.use(express.static(path.join(__dirname, 'public')));

const homeRoute=require('./app/routes/homeRoute')
app.use(homeRoute);

const PORT=process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});