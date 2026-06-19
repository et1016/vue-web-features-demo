import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import Chat from "@/views/Chat.vue";
import SocketMonitor from "@/views/SocketMonitor.vue";
import Notification from "@/views/Notification.vue";
import Profile from "@/views/Profile.vue";
import BasicLogin from "@/views/BasicLogin.vue";
import TGLogin from "@/views/TGLogin.vue";
import GoogleLogin from "@/views/GoogleLogin.vue";

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
        {
          path: "login/basic",
          component: BasicLogin,
        },
        {
          path: "login/tg",
          component: TGLogin,
        },
        {
          path: "login/google",
          component: GoogleLogin,
        },
      ],
    },
  ],
});

export default router;
