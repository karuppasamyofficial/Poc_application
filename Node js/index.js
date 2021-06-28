const Hapi = require("@hapi/hapi");
const sequelize = require("./utils/database");

const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
          origin: ['*'], // an array of origins or 'ignore'    
          credentials: true // boolean - 'Access-Control-Allow-Credentials'
      }
  }
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }


  var PREFIX = '/v1';
  

  var prefixize = function (route) {  route.path = PREFIX + route.path;return route; }
  server.route(routes.map(prefixize));
  // server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection....................", err);
  process.exit(1);
});
init();
