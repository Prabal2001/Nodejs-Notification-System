const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("notification_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

const db = {};

db.sequelize = sequelize;

db.Notification = require("./notification")(sequelize, DataTypes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;
