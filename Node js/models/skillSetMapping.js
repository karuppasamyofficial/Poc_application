const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = require("../models/user");
const Question = require("../models/question");
const SkillSetMapping = sequelize.define(
  "skill_set_mapping",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    skill_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Question.hasMany(SkillSetMapping);
SkillSetMapping.sync();
module.exports = SkillSetMapping;
