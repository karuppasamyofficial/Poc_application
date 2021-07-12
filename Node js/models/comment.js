const { Sequelize } = require("sequelize");
const sequelize = require("../utils/database");

const Question = require("./question");
const Answer = require("./answer");
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

    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  
  },
 
);

Answer.hasMany(Comment,{foreignKey: {name:"answer_id"}});
Comment.belongsTo(User,{foreignKey: {name:"user_id"}})
Comment.belongsTo(Question,{foreignKey: {name:"question_id"}})
// Comment.sync({force:true});

module.exports = Comment;
