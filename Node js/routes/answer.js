const Question = require("..//models/question");
const sequelize = require("../utils/database");
const Answer = require("..//models/answer");
const addAnswer = async (request, h) => {
var payload={
    answer:request.payload.answer,
    user_id:request.user_id,
    question_id:request.payload.question_id
  }
  try {
    const result = await sequelize.transaction(async (t) => {
      var answerCreation = await Answer.create(payload, {
        transaction: t,
      });
      return answerCreation;
    });

    return h.response(result).code(201);
  } catch (error) {
    return h.response({ status: error }).code(500);
  }
};

const getAnswers = async (request, h) => {
  var question_id = request.params.question_id;

  const comments = await Question.findAll({
    where: { id: question_id },
    include: [
      {
        model: Answer,
      },
    ],
  });

  return h.response(comments).code(200);
};

module.exports = [
  { method: "POST", path: "/answers",config: { auth: "jwt" }, handler: addAnswer },
  { method: "GET", path: "/answers/{question_id}",config: { auth: "jwt" }, handler: getAnswers },
];
