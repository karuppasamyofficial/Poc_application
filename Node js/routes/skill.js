const skill = require("..//models/skill");
const sequelize = require("../utils/database");
const createSkill = async (request, h) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      var skillCreation = await skill.create(request.payload,{
        transaction: t,
      });
      return skillCreation;
    });
    return h.response(result).code(201);
  } catch (error) {
    return h.response({ status: error }).code(500);
  }
};
module.exports = [{ method: "POST", path: "/skills", handler: createSkill }];
