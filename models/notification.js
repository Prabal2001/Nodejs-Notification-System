const sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Notification;
};
