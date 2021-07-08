const { Sequelize } = require("sequelize");;
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
    

    // user_name: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    
   
  },
  {
    timestamps: false,

  }
);
Question.belongsTo(User,{foreignKey: 'user_id'})
Question.sync({alter:true});
module.exports = Question;
