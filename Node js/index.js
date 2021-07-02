const Hapi = require("@hapi/hapi");
const sequelize = require("./utils/database");

const routes = require("./routes");

// const skill =require("./models/skill");


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

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  var version = "/v1";

  var addVersion = function (route) {
    route.path = version + route.path;
    return route;
  };
  server.route(routes.map(addVersion));
  // server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection....................", err);
  process.exit(1);
});
init();
