const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const User = require("../models/user");
const SkillSetMapping = require("../models/skillSetMapping");

const Question = sequelize.define(
  "question",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    question_title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    question_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    up_vote: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    down_vote: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
   
    
   
  },
  {
    timestamps: false,

  }
);
Question.sync({alter:true});
module.exports = Question;
