const Hapi = require("@hapi/hapi");
const sequelize = require("./utils/database");
const User = require("./models/user.js");
const Email = require("./models/email.js");
const PhoneNumber = require("./models/phone_number.js");
const Address = require("./models/address.js");
const Education = require("./models/education.js");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  server.route([
    {
      method: "GET",
      path: "/",
      handler: async (request, h) => {
        try {
          const userlist = await User.findAll({
            include: [
              {
                model: Email,
                attributes: ["id", "email_id", "userId"],
                where: { id: 5 },
              },
              { model: PhoneNumber, attributes: ["id", "phone_no"] },
            ],
          });
          return JSON.stringify(userlist);
        } catch (error) {}
      },
    },

    
    {
      method: "POST",
      path: "/userRegistration",
      handler: async (request, h) => {
        console.log("registerUser", request.payload);

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
        // data.map()
        try {
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
              institution_nmae: e.institution_nmae,
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
          const emailsInfo = await Email.bulkCreate(listofEmails);
          const phoneNoInfo = await PhoneNumber.bulkCreate(listofPhoneNo);
          const educationInfo = await Education.bulkCreate(educationDetails);
          const addressInfo = await Address.bulkCreate(listofAddress);

          //   const phoneNumber = await PhoneNumber.create({
          //     phone_no: "9876543210",
          //     userId: userCreation.id,
          //   });
          //   console.log("userCreation", userCreation.id);
          return "";
        } catch (error) {
          console.log("eroor in inserting", error);
        }
      },
    },
  ]);
  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection....................", err);
  process.exit(1);
});
init();
