const express = require("express");
const router = express.Router();
const socketController = require("../controllers/socket.controller");

router.get("/metrics", socketController.getMetrics);
router.post("/heartbeat", socketController.heartbeat);
router.post("/events", socketController.createEvent);

module.exports = router;
