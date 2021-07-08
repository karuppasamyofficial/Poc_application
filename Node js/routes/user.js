const User = require("../models/user.js");
const Email = require("../models/email.js");
const PhoneNumber = require("../models/phone_number.js");
const Address = require("../models/address.js");
const Education = require("../models/education.js");
const sequelize = require("../utils/database");
const Jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

require("dotenv").config();
const {
  emailvalidationschema,
  userSchema,
  phone_novalidationschema,
} = require("../utils/validation/userSchema");
const getUser = async (request, h) => {
  const { phone_no, password, email_id } = request.payload;
  if (request.payload.phone_no) {
    const { error } = phone_novalidationschema.validate(request.payload);

    if (error) return h.response(JSON.stringify(error.message)).code(422);

    try {
      const user = await User.findAll({
        include: [
          {
            model: PhoneNumber,
            attributes: ["id", "phone_no", "user_id"],
            where: { phone_no: phone_no },
          },
        ],
      });

      var userValid = verifyCredentails(user, password);
      if (userValid) {
        var accessToken = createToken({user_id:user[0].id});

        return h
          .response({ data: user, accessToken: accessToken, status: "success" })
          .code(200);
      } else {
        return h.response({ data: user, status: "failure" }).code(200);
      }
    } catch (error) {
      return h.response({ status: "Internal server error" }).code(500);
    }
  } else {
    const { error } = emailvalidationschema.validate(request.payload);

    if (error) return h.response(JSON.stringify(error.message)).code(422);
    try {
      const user = await User.findAll({
        include: [
          {
            model: Email,
            attributes: ["id", "email_id", "user_id"],
            where: { email_id: email_id },
          },
        ],
      });

      var userValid = verifyCredentails(user, password);
      if (userValid) {
        var accessToken = createToken({user_id:user[0].id});

        return h
          .response({ data: user, accessToken: accessToken, status: "success" })
          .code(200);
      } else {
        return h.response({ data: user, status: "failure" }).code(200);
      }
    } catch (error) {
      return h.response({ status: error }).code(500);
    }
  }
};

verifyCredentails = (user, password) => {
  if (user.length !== 0) {
    var passwordBytes = CryptoJS.AES.decrypt(
      user[0].password,
      process.env.CRYPTO_SECRETKEY
    );
    var decryptPassword = passwordBytes.toString(CryptoJS.enc.Utf8);

    return decryptPassword !== password ? false : true;
  } else {
    return false;
  }
};
createToken = (payload) => {
  console.log("create token",payload);
  var accessToken = Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRETKEY,{ algorithm: 'HS256'});
  return accessToken;
};

const userRegistration = async (request, h) => {
  const { error } = userSchema.validate(request.payload);

  if (error) return h.response(JSON.stringify(error.message)).code(422);

  const {
    first_name,
    last_name,
    dob,
    gender,
    password,
    email,
    address,
    phone_number,
    education,
  } = request.payload;
  var listofEmails = [];
  var listofAddress = [];
  var listofPhoneNo = [];
  var educationDetails = [];
  var encryptPassword = CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_SECRETKEY
  ).toString();
  try {
    const result = await sequelize.transaction(async (t) => {
      const userCreation = await User.create({
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        gender: gender,
        password: encryptPassword,
      });

      email.map((e, i) => {
        listofEmails.push({
          email_id: e.email_id,
          user_id: userCreation.id,
        });
      });
      phone_number.map((e, i) => {
        listofPhoneNo.push({
          phone_no: e.phone_no,
          user_id: userCreation.id,
        });
      });
      education.map((e, i) => {
        educationDetails.push({
          education_type: e.education_type,
          institution_name: e.institution_name,
          university: e.university,
          user_id: userCreation.id,
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
          user_id: userCreation.id,
        });
      });

      const emailsInfo = await Email.bulkCreate(listofEmails, {
        transaction: t,
      });
      const phoneNoInfo = await PhoneNumber.bulkCreate(listofPhoneNo, {
        transaction: t,
      });
      const educationInfo = await Education.bulkCreate(educationDetails, {
        transaction: t,
      });
      const addressInfo = await Address.bulkCreate(listofAddress, {
        transaction: t,
      });
      return userCreation;
    });
    return h.response(result).code(201);
  } catch (error) {
    return h.response({ status: "Internal server error" }).code(500);
  }
};

module.exports = [
  {
    method: "POST",
    path: "/login",
    handler: getUser,
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: userRegistration,
    config: {
      auth: false,
    },
  },
  // {
  //   method: "GET",
  //   path: "/test",
  //   config: { auth: "jwt" },

  //   handler: getpost,
  // },
];
