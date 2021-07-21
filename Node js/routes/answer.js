const Question = require("..//models/question");
const sequelize = require("../utils/database");
const Answer = require("..//models/answer");
const Comment = require("../models/comment");
const QuestionVote = require("../models/questionVote");
const { Sequelize } = require("sequelize");
const { required } = require("joi");
const AnswerVote = require("../models/answerVote");
const { QueryTypes } = require("sequelize");
var _ = require("lodash");

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
    const records = await sequelize.query(
      `SELECT
      comment.id, comment.message, comment.createdAt, comment.updatedAt, comment.answer_id as c_answerId, comment.user_id,
            question_votting.total_question_vote,
            answer_vote_votting.total_answer_vote,
     
            answer.id as answerId, answer.answer, answer.question_id, answer.user_id,
             question.id as question_id,question.question_title as question_title,question.question_description as question_description
           
     FROM   question
            LEFT JOIN (SELECT Sum(up_vote) AS total_question_vote,
                              id,
                              question_id as questionId
                       FROM   question_vote
                       GROUP  BY questionId) question_votting
                   ON question.id = question_votting.questionId
            LEFT JOIN answer
                   ON question.id = answer.question_id
            LEFT JOIN (SELECT Sum(up_vote) AS total_answer_vote,
                              id,
                              answer_id as answerId
                       FROM   answer_vote
                       GROUP  BY answerId) answer_vote_votting
                   ON answer.id = answer_vote_votting.answerId
            LEFT JOIN comment
                   ON  answer.id = comment.answer_id
             AND comment.answer_id IS NOT NULL
     WHERE  question.id =${question_id}`,
      {
        // nest: true,
        type: QueryTypes.SELECT,
      }
    );
    let questionsById = _.groupBy(records, "question_id");
    let questionIds = Object.keys(questionsById);
    var questions = [];

    console.log("question ids", records);
    questionIds.forEach((qId, qIndex) => {
      let question = {
        question_id: qId,
        question_title: questionsById[qId][0].question_title,
        question_description: questionsById[qId][0].question_description,
        total_question_vote: questionsById[qId][0].total_question_vote,
        answers: [],
      };

      let answersById = _.groupBy(questionsById[qId], "answerId");

      let answerIds = Object.keys(answersById);
        answerIds=answerIds.filter(val => val!='null' );
      console.log("after removing the",answerIds.filter(val => val!='null' ));
      answerIds.forEach((aId, aIndex) => {
        let aItem = answersById[aId];

        if (aItem && aItem.length > 0) {
          let answer = {
            id: aId,
            answer: answersById[aId][0].answer,
            total_answer_vote: answersById[aId][0].total_answer_vote,
            comments: [],
          };

          let commentsIds = answersById[aId];
          answersById[aId].forEach((cId, cIndex) => {
            let message = answersById[aId][cIndex].message;
            if (message) {
              answer.comments.push({ message: message });
            }
          });
          question.answers.push(answer);
        }
      });
      questions.push(question);
    });

    // questionId.forEach((qId, qIndex) => {
    //   var question = {
    //     question_id: questionsByIds[qId][0].question_id,
    //     question_title: questionsByIds[qId][0].question_title,
    //     question_description: questionsByIds[qId][0].question_description,
    //     answers: [],
    //   };
    //   let answersByIds = _.groupBy(questionsByIds[qId], "answer_id");
    //   let answerId = Object.keys(answersByIds);
    //   console.log("answerIds---------------", answerId);
    //   answerId.forEach((aId,aIndex)=>{

    //   })

    //   questionInfo.push(question);
    // });

    return h.response(questions).code(200);

    // const answersList = await Question.findAll({
    //   where: { id: question_id },
    //   attributes: [
    //     "id",
    //     // [sequelize.fn("SUM", sequelize.col("question_votes.up_vote")), "questionUpVote"],
    //   ],

    //   include: [
    //     // {
    //     //   model: QuestionVote,
    //     //   attributes: [],
    //     // },
    //     {
    //       model: Answer,
    //         attributes:["id","question_id",
    //         // [
    //         //   sequelize.fn("SUM", sequelize.col("answer_votes.up_vote")),
    //         //   "answerUpVote",
    //         // ]
    //       ],
    //       include: [
    //         // {
    //         //   model: AnswerVote,

    //         //   // attributes:[]
    //         // },
    //         {
    //           model: Comment,
    //         },
    //       ],
    //     },
    //   ],
    //   // group:["question_votes.question_id"]
    // });
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
