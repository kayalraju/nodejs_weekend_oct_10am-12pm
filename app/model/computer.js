const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Computer = sequelize.define('computer', {
    ram: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ssd: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    os: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: true
})

module.exports = Computer;