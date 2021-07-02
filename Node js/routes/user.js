const User = require("../models/user.js");
const Email = require("../models/email.js");
const PhoneNumber = require("../models/phone_number.js");
const Address = require("../models/address.js");
const Education = require("../models/education.js");
const sequelize = require("../utils/database");

const { authSchema, userSchema } = require("../utils/validation/userSchema");

const Joi = require("joi");

const getUser = async (request, h) => {
  console.log("login request", request.headers);

  const { email_id } = request.payload;

  const { error, value } = authSchema.validate(request.payload);

  if (error) return h.response(JSON.stringify(error.message)).code(422);
  try {
    const userlist = await User.findAll({
      include: [
        {
          model: Email,
          attributes: ["id", "email_id", "userId"],
          where: { email_id: email_id },
        },
      ],
    });
console.log("result of userlist",userlist);
// res.header("Access-Control-Allow-Origin", "*");
// return h.response({ data: userlist }).code(200).header("Access-Control-Allow-Credentials", true);

    return h.response({ data: userlist }).code(200);
  } catch (error) {
    console.log("userlist", error);
    return h.response({ status: "Internal server error" }).code(500);
  }
};



const userRegistration = async (request, h) => {
  console.log("registerUser", request.payload);
  const { error, value } = userSchema.validate(request.payload);
  console.log("eroro in user creation", error);

  if (error) return h.response(JSON.stringify(error.message)).code(422);

  const {
    first_name,
    last_name,
    dob,
    gender,
    email,
    address,
    phone_number,
    education,
  } = request.payload;
  var listofEmails = [];
  var listofAddress = [];
  var listofPhoneNo = [];
  var educationDetails = [];
  try {

    const result = await sequelize.transaction(async (t) => {

    const userCreation = await User.create({
      first_name: first_name,
      last_name: last_name,
      dob: dob,
      gender: gender,
    });

    email.map((e, i) => {
      listofEmails.push({
        email_id: e.email_id,
        userId: userCreation.id,
      });
    });
    phone_number.map((e, i) => {
      listofPhoneNo.push({
        phone_no: e.phone_no,
        userId: userCreation.id,
      });
    });
    education.map((e, i) => {
      educationDetails.push({
        education_type: e.education_type,
        institution_name: e.institution_name,
        university: e.university,
        userId: userCreation.id,
      });
    });
    address.map((data, i) => {
      listofAddress.push({
        address_type: data.address_type,
        address_line1: data.address_line1,
        address_line2: data.address_line2,
        address_line3: data.address_line3,
        landmark: data.landmark,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        userId: userCreation.id,
      });
    });
    console.log("listofEmails", listofEmails);
    const emailsInfo = await Email.bulkCreate(listofEmails,{
      transaction: t,
    });
    const phoneNoInfo = await PhoneNumber.bulkCreate(listofPhoneNo,{
      transaction: t,
    });
    const educationInfo = await Education.bulkCreate(educationDetails,{
      transaction: t,
    });
    const addressInfo = await Address.bulkCreate(listofAddress,{
      transaction: t,
    });
    return userCreation
  })
    return h.response(result).code(201);
  } catch (error) {
    return h.response({ status: "Internal server error" }).code(500);
  }
};

module.exports = [
  { method: "POST", path: "/login",handler: getUser },
  { method: "POST", path: "/users", handler: userRegistration },
];
