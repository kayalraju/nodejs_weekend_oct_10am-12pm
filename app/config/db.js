// require('dotenv').config();
// const mongoose = require('mongoose');


// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URL);
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;


const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs_sql", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;


