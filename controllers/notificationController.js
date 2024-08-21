const { Notification } = require("../models");
const notificationEmitter = require("../eventEmitter");

const connections = {};

notificationEmitter.on("new_notification", async (notification) => {
  try {
    const savedNotification = await Notification.create(notification);
    console.log("Notification saved:", savedNotification);

    const userConnections = connections[notification.userId];
    if (userConnections) {
      userConnections.forEach((res) => {
        res.write(`data: ${JSON.stringify(savedNotification)}\n\n`);
      });
    }
  } catch (error) {
    console.error("Error saving notification:", error.message);
  }
});

exports.createNotification = (req, res) => {
  const { userId, message } = req.body;
  const notification = { userId, message, read: false };
  console.log("Emitting notification:", notification);
  notificationEmitter.emit("new_notification", notification);
  res.status(201).json({ status: "Notification emitted", notification });
};

exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      notification.read = true;
      await notification.save();
      res.status(200).json(notification);
    } else {
      res.status(404).json({ error: "Notification not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sse = (req, res) => {
  const { userId } = req.params;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (!connections[userId]) {
    connections[userId] = [];
  }
  connections[userId].push(res);

  // req.on("close", () => {
  //   connections[userId] = connections[userId].filter((conn) => conn !== res);
  // });
};
