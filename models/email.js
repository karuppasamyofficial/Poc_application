const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const user=require('../models/user');
const email = sequelize.define('email',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false


        },

        email_id: {
            type: Sequelize.STRING,
            allowNull: false

        },


    }, {
    timestamps: false
}

)
// const email="kdjk";
user.hasMany(email);

// email.sync({force:true})

module.exports = email;