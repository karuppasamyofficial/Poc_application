const Question = require("..//models/question");
const sequelize = require("../utils/database");
const Comment = require("..//models/comment");

const addComment = async (request, h) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      var commentCreation = await Comment.create(request.payload, {
        transaction: t,
      });
      return commentCreation;
    });

    return h.response(result).code(201);
  } catch (error) {
    return h.response({ status: error }).code(500);
  }
};

const getComments = async (request, h) => {
  var questionId = request.params.questionId;

  const comments = await Question.findAll({
    where: { id: questionId },
    include: [
      {
        model: Comment,
      },
    ],
  });

  return h.response(comments).code(200);
};

module.exports = [
  { method: "POST", path: "/comments", handler: addComment },
  { method: "GET", path: "/comments/{questionId}", handler: getComments },
];
