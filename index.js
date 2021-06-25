const Hapi = require("@hapi/hapi");
const sequelize = require("./utils/database");
const User = require("./models/user.js");
const Email = require("./models/email.js");
const PhoneNumber = require("./models/phone_number.js");
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
          console.log("results", JSON.stringify(userlist));
          return JSON.stringify(userlist);
        } catch (error) {}
      },
    },

    {
      method: "GET",
      path: "/hello/{id}&{name}",
      handler: function (request, h) {
        console.log("query parameter", request.params.id, request.params.name);
        return h.response(request.params.name).code(401);
      },
      //     options: {
      //         validate: {
      //             params: {
      //              name:   Joi.string()
      // .alphanum()
      // .min(3)
      // .max(30)
      // .required()
      //             }
      //         }
      //     }
    },
    {
      method: "POST",
      path: "/userRegistration",
      handler: async (request, h) => {
        console.log("registerUser", request.payload);
const data=[{emailId:"nkvfb"},{emailId:"shfbjsf"}]
var ListofEmails=[];
// data.map()
        try {
          const userCreation = await User.create({
            first_name: "karuppasamy",
            last_name: "bala",
            dob: "1996-04-15",
            gender: "male",
          });

          data.map((e,i)=>{
            ListofEmails.push({email_id:e.emailId,userId:userCreation.id})
          });
          console.log("list of email id",ListofEmails);
          const email = await Email.bulkCreate(ListofEmails);
        //   const phoneNumber = await PhoneNumber.create({
        //     phone_no: "9876543210",
        //     userId: userCreation.id,
        //   });
          console.log("userCreation", userCreation.id);
          return userCreation;
        } catch (error) {}

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
