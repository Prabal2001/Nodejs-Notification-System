const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/notifications", notificationController.createNotification);
router.get("/notifications/:userId", notificationController.getNotifications);
router.patch("/notifications/:id", notificationController.markAsRead);
router.get("/notifications/sse/:userId", notificationController.sse);

module.exports = router;
