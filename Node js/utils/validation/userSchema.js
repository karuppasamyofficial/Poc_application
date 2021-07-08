const Joi = require("joi");

const emailvalidationschema = Joi.object({
  email_id: Joi.string().email().required(),
  password:Joi.string().required(),
});

const phone_novalidationschema = Joi.object({
  phone_no: Joi.string().max(10).required(),
  password:Joi.string().required(),
});

const emailSchema = Joi.object({
  email_id: Joi.string().email().required(),
});
const userSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().required(),
  password:Joi.string().required(),
  email: Joi.array()
    .items({
      email_id: Joi.string().email().required(),
    })
    .min(1)
    .required(),
  phone_number: Joi.array()
    .items({
      phone_no: Joi.string().min(1).max(10).required(),
    })
    .min(1)
    .required(),
  education: Joi.array()
    .items({
      education_type: Joi.string().required(),
      institution_name: Joi.string().required(),
      university: Joi.string().required(),
    })
    .min(1)
    .required(),
  address: Joi.array()
    .items({
      address_type: Joi.string().required(),
      address_line1: Joi.string().required(),
      address_line2: Joi.string().required(),
      address_line3: Joi.string(),
      landmark: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      pincode: Joi.string().required(),
    })
    .min(1)
    .required(),
});

module.exports = {
  emailvalidationschema,
  phone_novalidationschema,
  userSchema,
};
