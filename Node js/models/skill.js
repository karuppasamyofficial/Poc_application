const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const skill = sequelize.define(
  "skill",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    skill_name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

skill.sync();

module.exports = skill;
