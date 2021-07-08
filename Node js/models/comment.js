const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Question = require("./question");
const User = require("./user");
const Comment = sequelize.define(
  "comment",
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
    // user_name: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
  },
  {
    timestamps: false,
  }
);
Question.hasMany(Comment,{foreignKey: 'question_id'});
Comment.belongsTo(User,{foreignKey: 'user_id'})
Comment.sync();

module.exports = Comment;
