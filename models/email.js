const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User=require('../models/user');
const Email = sequelize.define('email',
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
// Email.belongsTo(User);
User.hasMany(Email);

// Email.sync({force:true})

module.exports = Email;