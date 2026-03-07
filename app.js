require('dotenv').config();
const express = require('express');
const ejs=require('ejs');
const path = require('path');
const connectDB = require('./app/config/db');
const cors=require('cors');
const helmet=require('helmet');
const morgan=require('morgan');
const Limiter=require('./app/utils/rateLimit')
const session=require('express-session');
const cookieParser=require('cookie-parser')



const app = express();
connectDB();

app.use(helmet());
//call db
app.use(Limiter);

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setup view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
//define static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/uploads',express.static('uploads'));

 app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))

  app.use(cookieParser())

app.use(require('./app/routes'));


const PORT=process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});