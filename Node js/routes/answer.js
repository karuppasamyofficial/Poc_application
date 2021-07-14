const Question = require("..//models/question");
const sequelize = require("../utils/database");
const Answer = require("..//models/answer");
const Comment = require("../models/comment");
const QuestionVote = require("../models/questionVote");
const { Sequelize } = require("sequelize");

const addAnswer = async (request, h) => {
  var payload = {
    answer: request.payload.answer,
    user_id: request.user_id,
    question_id: request.payload.question_id,
  };
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

  try {
    const comments = await Question.findAll({
      where: { id: question_id },

      attributes: ["id"],
      include: [
        {
          model: QuestionVote,

          attributes: [
            [
              sequelize.fn("SUM", sequelize.col("question_votes.up_vote")),
              "total",
            ],
          ],
        },
        {
          model: Answer,

          include: [
            {
              model: Comment,
            },
          ],
        },
      ],
    });

   
    return h.response(comments).code(200);
  } catch (error) {
    console.log("error---------------", error);
  }
};

module.exports = [
  {
    method: "POST",
    path: "/answers",
    config: { auth: "jwt" },
    handler: addAnswer,
  },
  {
    method: "GET",
    path: "/answers/{question_id}",
    config: { auth: "jwt" },
    handler: getAnswers,
  },
];
