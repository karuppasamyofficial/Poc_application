const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const user = sequelize.define('user', 
{
 id: {
        type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    dob:{
        type:Sequelize.DATE,
        allowNull:false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull:false
    },
    
},{
    timestamps: false
}
)
// user.sync({force:true});
module.exports = user;