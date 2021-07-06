const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("../models/user");
const Email = sequelize.define(
  "email",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    email_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
User.hasMany(Email);
Email.sync();
module.exports = Email;
