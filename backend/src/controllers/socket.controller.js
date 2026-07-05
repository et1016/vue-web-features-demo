const socketService = require("../services/socket.service");

exports.getMetrics = (req, res) => {
  try {
    return res.status(200).json(socketService.getMetrics());
  } catch (error) {
    return res.status(500).json({ message: error.message || "伺服器內部錯誤。" });
  }
};

exports.heartbeat = (req, res) => {
  try {
    return res.status(200).json(socketService.heartbeat(req.body || {}));
  } catch (error) {
    return res.status(500).json({ message: error.message || "伺服器內部錯誤。" });
  }
};

exports.createEvent = (req, res) => {
  try {
    return res.status(200).json(socketService.createEvent(req.body || {}));
  } catch (error) {
    return res.status(500).json({ message: error.message || "伺服器內部錯誤。" });
  }
};

exports.sendNotification = (req, res) => {
  try {
    const notification = socketService.createNotification(req.body || {});

    if (typeof req.app.locals.broadcastSocketMessage === "function") {
      req.app.locals.broadcastSocketMessage({ type: "notification", payload: notification });
    }

    return res.status(200).json({ notification });
  } catch (error) {
    return res.status(500).json({ message: error.message || "伺服器內部錯誤。" });
  }
};
