require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const { WebSocketServer, WebSocket } = require("ws");
const authRoutes = require("./routes/auth.routes");
const socketRoutes = require("./routes/socket.routes");
const socketService = require("./services/socket.service");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/socket", socketRoutes);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcastMetrics() {
  const payload = JSON.stringify({ type: "metrics", payload: socketService.getMetrics() });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "metrics", payload: socketService.getMetrics() }));

  ws.on("message", (raw) => {
    try {
      const message = JSON.parse(raw.toString());

      if (message.type === "heartbeat") {
        socketService.heartbeat(message.payload || {});
        broadcastMetrics();
      }

      if (message.type === "event") {
        socketService.createEvent(message.payload || {});
        broadcastMetrics();
      }
    } catch (error) {
      console.error("WebSocket message error", error);
    }
  });
});

server.listen(3000, () => {
  console.log("✅ Backend running on http://localhost:3000");
});
