<template>
  <header class="h-16 bg-white border-b px-6 flex items-center justify-between">
    <!-- Left -->
    <div>
      <h2 class="text-xl font-semibold text-slate-800">
        {{ pageTitle }}
      </h2>

      <p class="text-sm text-slate-500">
        {{ pageDescription }}
      </p>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-4">
      <!-- WebSocket Status -->
      <div class="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl">
        <div class="w-2 h-2 rounded-full bg-green-500"></div>

        <span class="text-sm text-green-600"> Connected </span>
      </div>

      <!-- Notification -->
      <button class="relative p-2 rounded-xl hover:bg-slate-100 transition">
        <Bell :size="20" />

        <span
          class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] rounded-full bg-red-500 text-white"
        >
          3
        </span>
      </button>

      <!-- Avatar -->
      <div class="flex items-center gap-3 pl-4 border-l">
        <img src="https://i.pravatar.cc/100?img=12" alt="avatar" class="w-10 h-10 rounded-full" />

        <div>
          <div class="font-medium text-sm">Ryan Chen</div>

          <div class="text-xs text-slate-500">Frontend Developer</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Bell } from "lucide-vue-next";

const route = useRoute();

const pageMap = {
  "/": {
    title: "Dashboard",
    description: "Overview of your realtime platform",
  },
  "/chat": {
    title: "Live Chat",
    description: "Realtime messaging experience",
  },
  "/socket": {
    title: "WebSocket Monitor",
    description: "Monitor websocket connection status",
  },
  "/notification": {
    title: "Notifications",
    description: "Manage push notification settings",
  },
  "/profile": {
    title: "Profile",
    description: "Manage your personal account",
  },
};

const pageTitle = computed(() => {
  return pageMap[route.path]?.title || "Dashboard";
});

const pageDescription = computed(() => {
  return pageMap[route.path]?.description || "Overview of your realtime platform";
});
</script>

<style scoped></style>
