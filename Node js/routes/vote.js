const QuestionVote = require("..//models/questionVote");
const sequelize = require("../utils/database");
const upVote = async (request, h) => {
  var payload = {
    sourceType: request.payload.sourceType,
    up_vote: request.payload.up_vote,
    user_id: request.user_id,
    question_id: request.payload.question_id,
  };
  const validateVote = await QuestionVote.findAll({
    where: {
      question_id: payload.question_id,
      user_id: payload.user_id,
    },
  });

  if (!validateVote.length) {
    try {
      const result = await sequelize.transaction(async (t) => {
        var voteCreation = await QuestionVote.create(
          {
            up_vote: request.payload.up_vote,
            down_vote: 0,
            user_id: request.user_id,
            question_id: request.payload.question_id,
          },
          {
            transaction: t,
          }
        );
        return voteCreation;
      });

      return h.response(result).code(201);
    } catch (error) {
      return h.response({ status: error }).code(500);
    }
  }
  else{
    try {
      const result = await sequelize.transaction(async (t) => {
      
     var voteUpdate=   await QuestionVote.update({ up_vote: 1,down_vote:0 }, {
          where: {
            question_id: payload.question_id,
            user_id:payload.user_id
          }
        },{
              transaction: t,
            });

            return  voteUpdate;

      });

      return h.response(result).code(201);
    } catch (error) {
      return h.response({ status: error }).code(500);
    }
    

  }
  
};

module.exports = [
  {
    method: "POST",
    path: "/votes/up",
    config: { auth: "jwt" },
    handler: upVote,
  },
];
