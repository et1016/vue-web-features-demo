<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl p-5 shadow-sm">
      <h1 class="text-xl font-semibold mb-2">Vue 2 PWA Push</h1>

      <div class="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">{{ permissionIcon }}</span>
          <span class="text-sm font-semibold text-gray-800">{{ permissionText }}</span>
        </div>
      </div>

      <!-- default（未詢問/預設） -->
      <div v-if="notificationPermission === 'default'" class="space-y-3">
        <p class="text-sm text-gray-600">{{ t("notification.permissionDefault") }}</p>
        <div class="flex flex-wrap gap-3">
          <!-- 開啟推播通知 -->
          <button
            class="rounded-xl bg-blue-600 px-4 py-2 text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="loading"
            @click="enableNotifications"
          >
            {{ loading ? t("notification.processing") : t("notification.requestPermission") }}
          </button>
        </div>
      </div>

      <!-- granted（允許） -->
      <div v-else-if="notificationPermission === 'granted'" class="space-y-3">
        <div class="flex flex-wrap gap-3">
          <!-- 送出測試通知 -->
          <button
            class="rounded-xl bg-blue-600 px-4 py-2 text-white cursor-pointer"
            @click="sendTestNotification"
          >
            {{ t("notification.sendTest") }}
          </button>
        </div>
      </div>

      <!-- denied（拒絕） -->
      <div v-else class="space-y-3">
        <div class="flex flex-wrap gap-3">
          <!-- 開啟通知指南 -->
          <button
            class="rounded-xl bg-amber-600 px-4 py-2 text-white cursor-pointer"
            @click="openNotificationGuide"
          >
            {{ t("notification.openGuide") }}
          </button>
        </div>
      </div>

      <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap items-center gap-3">
          <!-- 重新檢查權限 -->
          <button
            class="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 cursor-pointer"
            @click="refreshPermissionState"
          >
            {{ t("notification.refreshPermission") }}
          </button>
        </div>
        <!-- 即時 Socket 連線狀態 -->
        <div class="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span :class="socketStatusClass">{{ socketStatusLabel }}</span>
          <span>{{ t("notification.connectionHint") }}</span>
        </div>
      </div>
    </div>

    <!-- 近期通知 -->
    <div class="bg-white rounded-2xl p-5 shadow-sm">
      <h4 class="font-semibold mb-3">{{ t("notification.history") }}</h4>

      <div v-if="notifications.length" class="space-y-2">
        <div
          v-for="item in notifications"
          :key="item.id"
          class="rounded-xl border border-gray-200 p-3"
        >
          <div class="flex items-center justify-between text-sm">
            <span class="font-medium">{{ item.title }}</span>
            <span class="text-gray-500">{{ formatTime(item.createdAt || item.timestamp) }}</span>
          </div>
          <p class="mt-1 text-sm text-gray-600">{{ item.body }}</p>
        </div>
      </div>

      <p v-else class="text-sm text-gray-500">{{ t("notification.empty") }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import axios from "axios";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const socketUrl = import.meta.env.VITE_SOCKET_URL || "ws://localhost:3000";
const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
const notifications = ref([]);
const connectionStatus = ref("connecting");
const notificationPermission = ref("default");
const loading = ref(false);
let socket = null;

const permissionText = computed(() => {
  if (notificationPermission.value === "granted") return t("notification.statusGranted");
  if (notificationPermission.value === "denied") return t("notification.statusDenied");
  if (notificationPermission.value === "unsupported") return t("notification.statusUnsupported");
  return t("notification.statusDefault");
});

const permissionIcon = computed(() => {
  if (notificationPermission.value === "granted") return "✅";
  if (notificationPermission.value === "denied") return "❌";
  if (notificationPermission.value === "unsupported") return "⚠️";
  return "ℹ️";
});

const socketStatusLabel = computed(() => {
  if (connectionStatus.value === "connected") return t("notification.connected");
  if (connectionStatus.value === "disconnected") return t("notification.disconnected");
  return t("notification.connecting");
});

const socketStatusClass = computed(() => {
  return connectionStatus.value === "connected"
    ? "inline-flex rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
    : "inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600";
});

// 開啟推播通知
async function enableNotifications() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    notificationPermission.value = "unsupported";
    return;
  }

  if (isIOS() && !isStandalone()) {
    alert("iOS 使用者請先點擊分享並選擇加入主畫面後再開啟通知。");
    return;
  }

  loading.value = true;
  try {
    const result = await Notification.requestPermission();
    notificationPermission.value = result;

    if (result === "granted") {
      await registerServiceWorker();
      connectSocket();
      await sendTestNotification(t("notification.testTitle"), t("notification.testBody"));
    }
  } catch (error) {
    console.warn("Enable notifications failed", error);
  } finally {
    loading.value = false;
  }
}

// 送出測試通知
async function sendTestNotification(customTitle = null, customBody = null) {
  const title = customTitle || t("notification.testTitle");
  const body = customBody || `${t("notification.testBody")} ${new Date().toLocaleTimeString()}`;

  try {
    const response = await axios.post(`${apiBaseUrl}/socket/notify`, {
      title,
      body,
      user: "Demo User",
      category: "test",
    });

    if (response.status === 200 && response.data?.notification) {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        pushIncomingNotification(response.data.notification);
      }
    }
  } catch (error) {
    console.warn("Failed to send test notification", error);
  }
}

// 推播通知處理
function pushIncomingNotification(item) {
  const notificationKey =
    item?.id ||
    `${item?.title || ""}-${item?.body || ""}-${item?.createdAt || item?.timestamp || ""}`;

  if (
    notificationKey &&
    notifications.value.some((existing) => {
      const existingKey =
        existing?.id ||
        `${existing?.title || ""}-${existing?.body || ""}-${existing?.createdAt || existing?.timestamp || ""}`;
      return existingKey === notificationKey;
    })
  ) {
    return;
  }

  notifications.value.unshift(item);
  if (notifications.value.length > 10) {
    notifications.value = notifications.value.slice(0, 10);
  }

  showBrowserNotification(
    item.title || t("notification.testTitle"),
    item.body || t("notification.testBody"),
  );
}

// 顯示瀏覽器通知
function showBrowserNotification(title, body) {
  if (
    typeof window === "undefined" ||
    !("Notification" in window) ||
    notificationPermission.value !== "granted"
  ) {
    return;
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.showNotification(title, {
          body,
          icon: "/icons.svg",
        });
      })
      .catch((error) => {
        console.warn("Service worker notification failed", error);
      });
  } else {
    new Notification(title, { body });
  }
}

// 註冊 Service Worker
async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  try {
    await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
  } catch (error) {
    console.warn("Service worker registration failed", error);
  }
}

// 建立 WebSocket 連線
function connectSocket() {
  if (socket || typeof window === "undefined") return;

  connectionStatus.value = "connecting";
  socket = new WebSocket(socketUrl);

  socket.addEventListener("open", () => {
    connectionStatus.value = "connected";
  });

  socket.addEventListener("message", (event) => {
    try {
      const message = JSON.parse(event.data);

      if (message.type === "notification" && message.payload) {
        pushIncomingNotification(message.payload);
      }
    } catch (error) {
      console.warn("Failed to parse socket payload", error);
    }
  });

  socket.addEventListener("close", () => {
    connectionStatus.value = "disconnected";
    socket = null;
  });

  socket.addEventListener("error", () => {
    connectionStatus.value = "disconnected";
  });
}

// 取得用戶通知權限狀態
function refreshPermissionState() {
  if (typeof window !== "undefined" && "Notification" in window) {
    notificationPermission.value = Notification.permission;
  }
}

// 開啟通知指南
function openNotificationGuide() {
  if (typeof window === "undefined") return;
  const guideUrl = "https://support.google.com/chrome/answer/3220216";
  window.open(guideUrl, "_blank", "noopener,noreferrer");
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isStandalone() {
  return window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
}

function formatTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString();
}

onMounted(() => {
  refreshPermissionState();
  registerServiceWorker();
  connectSocket();
});

onBeforeUnmount(() => {
  if (socket) {
    socket.close();
    socket = null;
  }
});
</script>
