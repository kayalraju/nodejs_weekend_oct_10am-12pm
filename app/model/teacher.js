const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Teacher = sequelize.define('teacher', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
    address: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
})

module.exports = Teacher;