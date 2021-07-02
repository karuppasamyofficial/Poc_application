const Question = require("../models/question");
const SkillSetMapping = require("../models/skillSetMapping");
const sequelize = require("../utils/database");
const createQuestion = async (request, h) => {
  const { question_title, question_description, skill_set } = request.payload;
  var skillList = [];
  try {
    const result = await sequelize.transaction(async (t) => {
      var questionCreation = await Question.create({
        question_title,
        question_description,
      });
      skill_set.map(
        (id, index) => {
          skillList.push({ skill_id: id, questionId: questionCreation.id });
        },
        { transaction: t }
      );

      var skillSetMap = await SkillSetMapping.bulkCreate(skillList, {
        transaction: t,
      });
      return questionCreation;
    });

    return h.response(result).code(201);
  } catch (error) {
    return h.response({ status: error }).code(500);
  }
};

module.exports = [
  { method: "POST", path: "/questions", handler: createQuestion },
];
