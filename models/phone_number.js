const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User=require('./user');
const PhoneNumber = sequelize.define('phone_number',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
},

        phone_no: {
            type: Sequelize.STRING,
            allowNull: false

        },
       
}, {
    timestamps: false
}

)

User.hasMany(PhoneNumber);
// PhoneNumber.sync({force:true})
module.exports = PhoneNumber;