import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import Chat from "@/views/Chat.vue";
import SocketMonitor from "@/views/SocketMonitor.vue";
import Notification from "@/views/Notification.vue";
import Profile from "@/views/Profile.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      component: MainLayout,

      children: [
        {
          path: "",
          component: Dashboard,
        },
        {
          path: "chat",
          component: Chat,
        },
        {
          path: "socket",
          component: SocketMonitor,
        },
        {
          path: "notification",
          component: Notification,
        },
        {
          path: "profile",
          component: Profile,
        },
      ],
    },
  ],
});

export default router;
