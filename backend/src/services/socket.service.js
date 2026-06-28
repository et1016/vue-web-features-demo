const onlineUsers = new Map();
const eventStream = [];

function formatTime(date) {
  return new Date(date).toLocaleString();
}

function pushEvent(event) {
  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    timestamp: new Date().toISOString(),
    ...event,
  };

  eventStream.unshift(entry);
  if (eventStream.length > 20) {
    eventStream.length = 20;
  }

  return entry;
}

function seedInitialData() {
  if (onlineUsers.size > 0) {
    return;
  }

  pushEvent({
    type: "system",
    message: "Socket 監聽機制已啟動",
    user: "System",
  });
}

seedInitialData();

function getMetrics() {
  const users = Array.from(onlineUsers.values())
    .map((user) => ({ ...user, lastSeenAt: formatTime(user.lastSeen) }))
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));

  return {
    connected: true,
    onlineCount: users.length,
    onlineUsers: users,
    lastSeen: users[0]?.lastSeenAt || "—",
    eventsCount: eventStream.length,
    events: eventStream.slice(0, 10),
    eventStream: eventStream.slice(0, 10),
    updatedAt: new Date().toISOString(),
  };
}

function heartbeat(payload = {}) {
  const { id = `user-${Date.now()}`, name = "Guest" } = payload;
  const now = new Date().toISOString();

  onlineUsers.set(id, {
    id,
    name,
    lastSeen: now,
  });

  pushEvent({
    type: "heartbeat",
    message: `${name} 已加入即時會話`,
    user: name,
  });

  return getMetrics();
}

function createEvent(payload = {}) {
  const { type = "info", message = "New event", user = "System" } = payload;
  return pushEvent({ type, message, user });
}

module.exports = {
  getMetrics,
  heartbeat,
  createEvent,
};
