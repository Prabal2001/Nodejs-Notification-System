const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const notificationRoutes = require("./routes/notificationRoutes");
const { sequelize } = require("./models");

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", notificationRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
