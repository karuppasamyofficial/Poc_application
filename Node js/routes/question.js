const Question = require("../models/question");
const SkillSetMapping = require("../models/skillSetMapping");
const sequelize = require("../utils/database");
const skill = require("..//models/skill");

const createQuestion = async (request, h) => {
  const { question_title, question_description, skill_set, new_skills } =
    request.payload;

  var skillList = [];
  try {
    const result = await sequelize.transaction(async (t) => {
      if (new_skills.length > 0) {
        console.log("new sills", new_skills);
        // await createSkill({ skill_name: "js" });
        var skillCreation = await skill.bulkCreate(new_skills,{
          transaction: t,
        });
       
        var newSkillIds=[];
        skillCreation.map((skill,i)=>{
          newSkillIds.push(skill.id)
        })

        // skill_set=[...skill_set,...newSkillIds]
        console.log("--------------------",[...skill_set,...newSkillIds]);

      }
var allSkillIds=[...skill_set,...newSkillIds];
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
console.log("all skill values",allSkillIds);
      var skillSetMap = await SkillSetMapping.bulkCreate(skillList, {
        transaction: t,
      });
      return questionCreation;
    });

    return h.response(result).code(201);
  } catch (error) {

    console.log("---------",error)
    return h.response({ status: error }).code(500);
  }
};

module.exports = [
  { method: "POST", path: "/questions", handler: createQuestion },
];
