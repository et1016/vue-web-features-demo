<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <!-- 狀態 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div>{{ t("socket.status") }}</div>
        <div class="text-2xl mt-2" :class="isConnected ? 'text-green-500' : 'text-gray-500'">
          {{ isConnected ? t("socket.connected") : "Disconnected" }}
        </div>
      </div>

      <!-- 線上人數 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div>{{ t("socket.users") }}</div>
        <div class="text-2xl mt-2">{{ onlineCount }}</div>
      </div>

      <!-- 事件 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <div>{{ t("socket.events") }}</div>
        <div class="text-2xl mt-2">{{ events.length }}</div>
      </div>
    </div>

    <!-- 線上使用者 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">{{ t("socket.onlineUsers") }}</h3>
        <div class="space-y-3">
          <div
            v-for="user in onlineUsers"
            :key="user.id"
            class="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0"
          >
            <div>
              <div class="font-medium">{{ user.name }}</div>
              <div class="text-sm text-gray-500">{{ user.id }}</div>
            </div>
            <div class="text-sm text-gray-500">
              {{ t("socket.lastSeen") }}: {{ user.lastSeenAt }}
            </div>
          </div>
        </div>
      </div>

      <!-- 近期事件 -->
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">{{ t("socket.recentEvents") }}</h3>
        <div class="space-y-2">
          <div v-if="events.length === 0" class="text-sm text-gray-500">
            {{ t("socket.noEvents") }}
          </div>
          <div v-for="event in events" :key="event.id" class="rounded-lg bg-gray-50 p-3 text-sm">
            <div class="flex items-center justify-between">
              <span class="font-medium">{{ event.user }}</span>
              <span class="text-gray-500">{{ event.timestamp }}</span>
            </div>
            <div class="text-gray-600 mt-1">{{ event.message }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 事件串流 -->
    <div class="bg-white rounded-2xl p-5 mt-6 shadow-sm">
      <h3 class="font-semibold mb-4">{{ t("socket.eventStream") }}</h3>

      <div class="mb-4 flex gap-2">
        <button
          @click="sendHeartbeat"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
        >
          {{ t("socket.sendHeartbeat") }}
        </button>
        <button
          @click="sendCustomEvent"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm font-medium"
        >
          {{ t("socket.createEvent") }}
        </button>
      </div>

      <div class="space-y-2">
        <div v-if="eventStream.length === 0" class="text-sm text-gray-500">
          {{ t("socket.noEvents") }}
        </div>
        <div
          v-for="event in eventStream"
          :key="event.id"
          class="rounded-lg border border-gray-100 p-3 text-sm"
        >
          <div class="flex items-center justify-between">
            <span class="font-medium">{{ event.type }}</span>
            <span class="text-gray-500">{{ event.timestamp }}</span>
          </div>
          <div class="text-gray-600 mt-1">{{ event.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "@/i18n";

const { t } = useI18n();

const onlineCount = ref(0);
const onlineUsers = ref([]);
const events = ref([]);
const eventStream = ref([]);
const isConnected = ref(false);
let socket = null;

function formatTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

function applyMetrics(data) {
  // 線上人數
  onlineCount.value = data.onlineCount ?? 0;
  // 誰在線上
  onlineUsers.value = (data.onlineUsers ?? []).map((user) => ({
    ...user,
    lastSeenAt: formatTime(user.lastSeen),
  }));
  // 監聽機制資訊
  events.value = (data.events ?? []).map((event) => ({
    ...event,
    timestamp: formatTime(event.timestamp),
  }));
  eventStream.value = (data.eventStream ?? []).map((event) => ({
    ...event,
    timestamp: formatTime(event.timestamp),
  }));
}

// 發送心跳
function sendHeartbeat() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const savedName = localStorage.getItem("socket-monitor-user") || "User";
    socket.send(JSON.stringify({ type: "heartbeat", payload: { id: savedName, name: savedName } }));
  }
}

// 建立事件
function sendCustomEvent() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const savedName = localStorage.getItem("socket-monitor-user") || "User";
    const message = prompt("Enter event message:", "Custom event triggered");
    if (message) {
      socket.send(
        JSON.stringify({ type: "event", payload: { type: "custom", message, user: savedName } }),
      );
    }
  }
}

onMounted(() => {
  const savedName =
    localStorage.getItem("socket-monitor-user") || `Visitor-${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem("socket-monitor-user", savedName);

  socket = new WebSocket("ws://localhost:3000");

  socket.addEventListener("open", () => {
    isConnected.value = true;
    socket.send(JSON.stringify({ type: "heartbeat", payload: { id: savedName, name: savedName } }));
  });

  socket.addEventListener("message", (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "metrics") {
        applyMetrics(data.payload);
      }
    } catch (error) {
      console.error(error);
    }
  });

  socket.addEventListener("close", () => {
    isConnected.value = false;
  });

  socket.addEventListener("error", () => {
    isConnected.value = false;
  });
});

onUnmounted(() => {
  if (socket) {
    socket.close();
  }
});
</script>

<style scoped></style>
