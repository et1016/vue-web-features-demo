<template>
  <aside class="w-64 bg-white border-r flex flex-col">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b">
      <h1 class="text-xl font-bold text-slate-800">{{ t("brand") }}</h1>
    </div>

    <!-- Menu -->
    <nav class="flex-1 p-4 space-y-2">
      <RouterLink
        v-for="item in menus"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
        :class="
          route.path === item.path
            ? 'bg-blue-50 text-blue-600 font-medium'
            : 'text-slate-600 hover:bg-slate-100'
        "
      >
        <component :is="item.icon" :size="20" />
        <span>{{ t(item.name) }}</span>
      </RouterLink>

      <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div
          class="px-4 pb-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
        >
          {{ t("sidebar.loginGroup") }}
        </div>

        <RouterLink
          v-for="item in loginMenus"
          :key="item.name"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          :class="
            route.path === item.path
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          "
        >
          <component :is="item.icon" :size="20" />
          <span>{{ t(item.name) }}</span>
        </RouterLink>
      </div>
    </nav>

    <!-- User Info -->
    <div class="border-t p-4">
      <div class="flex items-center gap-3">
        <img src="https://i.pravatar.cc/100?img=12" alt="avatar" class="w-10 h-10 rounded-full" />

        <div>
          <div class="font-medium text-sm">Ryan Chen</div>

          <div class="text-xs text-slate-500">Frontend Developer</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  LayoutDashboard,
  MessageSquare,
  Wifi,
  Bell,
  User,
  ArrowRightCircle,
  LogIn,
  MessageCircle,
} from "lucide-vue-next";
import { useI18n } from "@/i18n";

const route = useRoute();
const { t } = useI18n();

const menus = [
  {
    name: "sidebar.dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "sidebar.chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    name: "sidebar.websocket",
    path: "/socket",
    icon: Wifi,
  },
  {
    name: "sidebar.notifications",
    path: "/notification",
    icon: Bell,
  },
  {
    name: "sidebar.profile",
    path: "/profile",
    icon: User,
  },
];

const loginMenus = [
  {
    name: "sidebar.loginBasic",
    path: "/login/basic",
    icon: LogIn,
  },
  {
    name: "sidebar.loginTg",
    path: "/login/tg",
    icon: MessageCircle,
  },
  {
    name: "sidebar.loginGoogle",
    path: "/login/google",
    icon: ArrowRightCircle,
  },
];
</script>

<style scoped></style>
