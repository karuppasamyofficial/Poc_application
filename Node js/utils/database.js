const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("stack_overflow", "root", "karuppasamy", {
  define: {
    freezeTableName: true,
  },
  host: "localhost",
  dialect: "mysql",
});
module.exports = sequelize;
