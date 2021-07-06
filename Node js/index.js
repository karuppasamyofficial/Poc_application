const Hapi = require("@hapi/hapi");
const sequelize = require("./utils/database");
const routes = require("./routes");
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
  process.exit(1);
});
init();
