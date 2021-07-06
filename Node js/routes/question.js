const Question = require("../models/question");
const SkillSetMapping = require("../models/skillSetMapping");
const sequelize = require("../utils/database");
const skill = require("..//models/skill");

const createQuestion = async (request, h) => {
  const { question_title, question_description, skill_set, new_skills } =
    request.payload;
  console.log("createQuestion------------", request.payload);
  var skillList = [];
  try {
    const result = await sequelize.transaction(async (t) => {
      if (new_skills.length > 0) {
        console.log("new sills", new_skills);
        // await createSkill({ skill_name: "js" });
        var skillCreation = await skill.bulkCreate(new_skills, {
          transaction: t,
        });

        var newSkillIds = [];
        skillCreation.map((skill, i) => {
          newSkillIds.push(skill.id);
        });

        // skill_set=[...skill_set,...newSkillIds]
        console.log("--------------------", [...skill_set, ...newSkillIds]);
      }
      var allSkillIds = [...skill_set, ...newSkillIds];
      var questionCreation = await Question.create({
        question_title,
        question_description,
      });
      allSkillIds.map(
        (id, index) => {
          skillList.push({ skill_id: id, questionId: questionCreation.id });
        },
        { transaction: t }
      );
      console.log("all skill values", allSkillIds);
      var skillSetMap = await SkillSetMapping.bulkCreate(skillList, {
        transaction: t,
      });
      return questionCreation;
    });

    return h.response(result).code(201);
  } catch (error) {
    console.log("---------", error);
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

    console.log("trendingSkill------------", trendingSkill);

    const questionList = await Question.findAll({
      include: [
        {
          model: SkillSetMapping,
          attributes: [],
          where: { skill_id: trendingSkill[0].skill_id },
        },
      ],
    });
    // const userlist = await SkillSetMapping.findAll({
    //   where: { skill_id: trendingSkill[0].skill_id },
    //   include: [
    //     {
    //       model: Question,
    //       // attributes: ["id", "phone_no", "userId"],

    //     },
    //   ],
    // });
    console.log("userlist", questionList);

    return h.response(questionList).code(200);
  } catch (err) {
    console.log("userlist--------------------", err);
  }
};

module.exports = [
  { method: "POST", path: "/questions", handler: createQuestion },
  { method: "GET", path: "/questions", handler: getQuestions },
];
