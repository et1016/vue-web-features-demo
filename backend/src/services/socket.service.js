const onlineUsers = new Map();
const eventStream = [];
const notificationHistory = [];

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

function pushNotification(payload = {}) {
  const notification = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: payload.title || "新通知",
    body: payload.body || "您收到一則新的推播通知",
    user: payload.user || "System",
    category: payload.category || "general",
    channel: payload.channel || "push",
    createdAt: new Date().toISOString(),
  };

  notificationHistory.unshift(notification);
  if (notificationHistory.length > 20) {
    notificationHistory.length = 20;
  }

  pushEvent({
    type: "notification",
    message: notification.title,
    user: notification.user,
  });

  return notification;
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
    notifications: notificationHistory.slice(0, 10),
    notificationHistory: notificationHistory.slice(0, 10),
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
}

function createEvent(payload = {}) {
  const { type = "info", message = "New event", user = "System" } = payload;
  return pushEvent({ type, message, user });
}

function createNotification(payload = {}) {
  return pushNotification(payload);
}

module.exports = {
  getMetrics,
  heartbeat,
  createEvent,
  createNotification,
};
