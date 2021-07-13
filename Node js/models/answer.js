const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Question = require("./question");
const User = require("./user");
const Answer = sequelize.define(
  "answer",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    answer: {
      type: Sequelize.STRING,
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
    // user_name: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
  }
);

Question.hasMany(Answer, { foreignKey: "question_id" });
Answer.belongsTo(User, { foreignKey: "user_id" });
Answer.sync({alter:true});


module.exports = Answer;
