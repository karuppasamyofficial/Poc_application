const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");
const Question = require("./question");
const Answer = require("./answer");
const User = require("./user");
const AnswerVote = sequelize.define(
  "answer_vote",
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


AnswerVote.belongsTo(User,{foreignKey: {name:"user_id"}})
Answer.hasMany(AnswerVote,{foreignKey: {name:"answer_id"}})
AnswerVote.belongsTo(Answer,{foreignKey: {name:"answer_id"}})
AnswerVote.sync();

module.exports = AnswerVote;
