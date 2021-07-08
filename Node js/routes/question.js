const Question = require("../models/question");
const SkillSetMapping = require("../models/skillSetMapping");
const sequelize = require("../utils/database");
const skill = require("..//models/skill");

const createQuestion = async (request, h) => {
  const {
    question_title,
    question_description,
    skill_set,
    new_skills,
    user_name,
  } = request.payload;
console.log("console.log",request.user_id);
  var skillList = [];
  try {
    const result = await sequelize.transaction(async (t) => {
      if (new_skills.length > 0) {
        var skillCreation = await skill.bulkCreate(new_skills, {
          transaction: t,
        });

        var newSkillIds = [];
        skillCreation.map((skill, i) => {
          newSkillIds.push(skill.id);
        });
      }
      var allSkillIds = [...skill_set, ...newSkillIds];
      var user_id=request.user_id;
      var questionCreation = await Question.create({
        question_title,
        question_description,
        
        user_id
      });
      allSkillIds.map(
        (id, index) => {
          skillList.push({ skill_id: id, question_id: questionCreation.id });
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

const getQuestions = async (request, h) => {
  try {
    const trendingSkill = await SkillSetMapping.findAll({
      attributes: [
        "skill_id",
        [sequelize.fn("count", sequelize.col("skill_id")), "count"],
      ],

      group: ["skill_id"],
      order: sequelize.literal("count DESC"),
      raw: true,
    });
    console.log("treding skill set--------------",trendingSkill);

    const questionList = await Question.findAll({
      include: [
        {
          model: SkillSetMapping,
          attributes: [],
          where: { skill_id: trendingSkill[0].skill_id },
        },
      ],
    });
    return h.response(questionList).code(200);
  } catch (err) {}
};

module.exports = [
  { method: "POST", path: "/questions",config: { auth: "jwt" }, handler: createQuestion },
  { method: "GET", path: "/questions",config: { auth: "jwt" }, handler: getQuestions },
];
