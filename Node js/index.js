const Hapi = require("@hapi/hapi");
const sequelize = require("./utils/database");
const routes = require("./routes");

const Jwt = require("jsonwebtoken");
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register(require("hapi-auth-jwt2"));

  server.auth.strategy("jwt", "jwt", {
    key: "854b92c7125d7da07bc9e483ab0ee0c7", // Never Share your secret key
    // verifyOptions: { algorithms: ['HS256'] }
    validate: validate,
  });

  server.auth.default("jwt");

  // await server.register([require('hapi-auth-jwt')]);

  try {
    await sequelize.authenticate();
  } catch (error) {}
  var version = "/v1";
  var addVersion = function (route) {
    route.path = version + route.path;
    return route;
  };

  server.route(routes.map(addVersion));
  await server.start();
};
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection-----------", err);
  process.exit(1);
});
init();

var validate = function (decoded, request, h) {
  // do your checks to see if the person is valid

  console.log("decode.......................", decoded);
  if (decoded.user_id) {
    request.user_id = decoded.user_id;
    return { isValid: true };
  } else {
    return { isValid: false };
  }
};
