const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Question = require("./question");
const Answer = require("./answer");
const User = require("./user");
const QuestionVote = sequelize.define(
  "question_vote",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    up_vote: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue:0
    },
    down_vote: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue:0
      },
  
  },
 
);


QuestionVote.belongsTo(User,{foreignKey: {name:"user_id"}})
Question.hasMany(QuestionVote,{foreignKey: {name:"question_id"}})
QuestionVote.belongsTo(Question,{foreignKey: {name:"question_id"}})
QuestionVote.sync();

module.exports = QuestionVote;
