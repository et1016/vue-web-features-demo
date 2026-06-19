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

        <span class="text-sm text-green-600">{{ t("common.connected") }}</span>
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

      <!-- Language Switcher -->
      <div
        class="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition"
      >
        <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {{ t("header.language") }}
        </span>

        <select
          v-model="locale"
          class="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
        >
          <option v-for="option in languageOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Theme Switcher -->
      <button
        @click="toggleTheme"
        class="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-300 transition dark:bg-slate-900 dark:border-slate-700"
      >
        <component
          :is="isDark ? Sun : Moon"
          :size="18"
          class="text-slate-600 dark:text-slate-200"
        />
        <span class="text-sm font-medium text-slate-600 dark:text-slate-200">
          {{ isDark ? t("header.lightMode") : t("header.darkMode") }}
        </span>
      </button>

      <!-- Avatar -->
      <div class="flex items-center gap-3 pl-4 border-l">
        <img src="https://i.pravatar.cc/100?img=12" alt="avatar" class="w-10 h-10 rounded-full" />

        <div>
          <div class="font-medium text-sm">Ryan Chen</div>

          <div class="text-xs text-slate-500">{{ t("header.developer") }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Bell, Moon, Sun } from "lucide-vue-next";
import { useI18n } from "@/i18n";
import { useTheme } from "@/utils/theme";

const route = useRoute();
const { t, locale, languageOptions } = useI18n();
const { isDark, toggleTheme } = useTheme();

const pageMap = {
  "/": {
    title: "page.dashboard.title",
    description: "page.dashboard.description",
  },
  "/chat": {
    title: "page.chat.title",
    description: "page.chat.description",
  },
  "/socket": {
    title: "page.socket.title",
    description: "page.socket.description",
  },
  "/notification": {
    title: "page.notification.title",
    description: "page.notification.description",
  },
  "/profile": {
    title: "page.profile.title",
    description: "page.profile.description",
  },
};

const pageTitle = computed(() => {
  return t(pageMap[route.path]?.title || "page.dashboard.title");
});

const pageDescription = computed(() => {
  return t(pageMap[route.path]?.description || "page.dashboard.description");
});
</script>

<style scoped></style>
