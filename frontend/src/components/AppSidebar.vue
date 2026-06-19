<template>
  <aside class="w-64 bg-white border-r flex flex-col">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b">
      <h1 class="text-xl font-bold text-slate-800">Realtime Hub</h1>
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
        <span>{{ item.name }}</span>
      </RouterLink>
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
import { LayoutDashboard, MessageSquare, Wifi, Bell, User } from "lucide-vue-next";

const route = useRoute();

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Live Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    name: "WebSocket",
    path: "/socket",
    icon: Wifi,
  },
  {
    name: "Notifications",
    path: "/notification",
    icon: Bell,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];
</script>

<style scoped></style>
