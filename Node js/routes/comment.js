const Question = require("..//models/question");
const sequelize = require("../utils/database");
const Comment = require("..//models/comment");

const addComment = async (request, h) => {

  var payload={
    answer_id:request.payload.answer_id,
    user_id:request.user_id,
    message:request.payload.message,
    question_id:request.payload.question_id
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      var commentCreation = await Comment.create(payload, {
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
  var question_id = request.params.question_id;

  const comments = await Question.findAll({
    where: { id: question_id },
    include: [
      {
        model: Comment,
      },
    ],
  });

  return h.response(comments).code(200);
};

module.exports = [
  { method: "POST", path: "/comments",config: { auth: "jwt" }, handler: addComment },
  { method: "GET", path: "/comments/{question_id}",config: { auth: "jwt" }, handler: getComments },
];
