const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const User = require("../models/user");
const Education = sequelize.define(
  "education",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    education_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    institution_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    university: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
User.hasMany(Education,{foreignKey: 'user_id'});
Education.sync();

module.exports = Education;

