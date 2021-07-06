const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const User = require("../models/user");
const Address = sequelize.define(
  "address",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    address_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address_line1: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address_line2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    address_line3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    landmark: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pincode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
User.hasMany(Address);

Address.sync();

module.exports = Address;
