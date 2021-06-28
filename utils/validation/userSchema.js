const Joi = require("joi");

const authSchema = Joi.object({
    email_id: Joi.string().email().required()
    
});
  
    
module.exports={
    authSchema,
};