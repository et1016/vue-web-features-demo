import { ref, watch } from "vue";

export type Locale = "en" | "zh-TW";
const STORAGE_KEY = "app-locale";
const defaultLocale: Locale = "en";
const initialLocale =
  typeof window !== "undefined"
    ? ((localStorage.getItem(STORAGE_KEY) as Locale) ?? defaultLocale)
    : defaultLocale;

const locale = ref<Locale>(initialLocale);

watch(locale, (newLocale) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, newLocale);
  }
});

const languageOptions = [
  { value: "en", label: "English" },
  { value: "zh-TW", label: "繁體中文" },
] as const;

const messages = {
  en: {
    brand: "Realtime Hub",
    common: {
      connected: "Connected",
    },
    header: {
      developer: "Frontend Developer",
      language: "Language",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
    },
    sidebar: {
      dashboard: "Dashboard",
      chat: "Live Chat",
      websocket: "WebSocket",
      notifications: "Notifications",
      profile: "Profile",
      loginGroup: "Login Methods",
      loginBasic: "Basic Login",
      loginTg: "Telegram Login",
      loginGoogle: "Google Login",
    },
    login: {
      basic: {
        title: "Basic Login",
        description: "Sign in with your email and password.",
        email: "Email address",
        password: "Password",
        submit: "Sign In",
      },
      tg: {
        title: "Telegram Login",
        description: "Authenticate using Telegram.",
        button: "Continue with Telegram",
      },
      google: {
        title: "Google Login",
        description: "Sign in with your Google account.",
        button: "Continue with Google",
      },
    },
    page: {
      dashboard: {
        title: "Dashboard",
        description: "Overview of your realtime platform",
      },
      chat: {
        title: "Live Chat",
        description: "Realtime messaging experience",
      },
      socket: {
        title: "WebSocket Monitor",
        description: "Monitor websocket connection status",
      },
      notification: {
        title: "Notifications",
        description: "Manage push notification settings",
      },
      profile: {
        title: "Profile",
        description: "Manage your personal account",
      },
    },
    dashboard: {
      cards: {
        onlineUsers: "Online Users",
        messages: "Messages",
        notifications: "Notifications",
        rooms: "Rooms",
      },
      recentActivity: "Recent Activity",
      systemStatus: "System Status",
      googleLogin: "Google Login",
      websocket: "WebSocket",
      pushNotification: "Push Notification",
      connected: "Connected",
      enabled: "Enabled",
      activities: [
        "Tom joined chat room",
        "Amy sent a message",
        "Push notification sent",
        "Google login success",
      ],
    },
    chat: {
      title: "Chat Rooms",
      typeMessage: "Type a message...",
      rooms: ["General", "Vue", "Node", "Frontend"],
      messages: {
        hello: "Hello",
        hi: "Hi",
      },
    },
    socket: {
      status: "Status",
      users: "Online Count",
      events: "Events",
      eventStream: "Event Stream",
      onlineUsers: "Online Users",
      lastSeen: "Last online",
      recentEvents: "Recent events",
      noEvents: "No events yet",
      connected: "Connected",
      sendHeartbeat: "Send Heartbeat",
      createEvent: "Create Event",
      disconnected: "Disconnected",
      items: ["14:20 User Connected", "14:21 Message Received", "14:22 Push Sent"],
    },
    notification: {
      settings: "Notification Settings",
      chat: "Chat Notification",
      push: "Push Notification",
      activity: "Activity Notification",
      requestPermission: "Enable Push Notification",
      refreshPermission: "Refresh Permission",
      openGuide: "Open Browser Settings",
      sendTest: "Send Test Notification",
      processing: "Processing...",
      history: "Recent Notifications",
      empty: "No notifications yet",
      connected: "Connected",
      disconnected: "Disconnected",
      connecting: "Connecting",
      connectionHint: "Realtime socket connection",
      statusDefault: "Current status: notifications are not enabled",
      statusDenied: "Current status: notifications were denied",
      statusGranted: "Current status: notifications are enabled",
      statusUnsupported: "Current status: this browser does not support notifications",
      permissionDefault: "Open notifications to receive the latest messages",
      testTitle: "Test Push Notification",
      testBody: "This is a test notification from the demo server",
    },
    profile: {
      title: "Profile",
      placeholder: "Your profile details appear here.",
    },
  },
  "zh-TW": {
    brand: "即時中心",
    common: {
      connected: "已連線",
    },
    header: {
      developer: "前端工程師",
      language: "語言",
      darkMode: "夜間模式",
      lightMode: "日間模式",
    },
    sidebar: {
      dashboard: "儀表板",
      chat: "聊天",
      websocket: "WebSocket",
      notifications: "通知",
      profile: "個人資料",
      loginGroup: "登入方式",
      loginBasic: "一般登入",
      loginTg: "Telegram 登入",
      loginGoogle: "Google 登入",
    },
    login: {
      basic: {
        title: "一般登入",
        description: "使用電子郵件與密碼登入。",
        email: "電子郵件地址",
        password: "密碼",
        submit: "登入",
      },
      tg: {
        title: "Telegram 登入",
        description: "使用 Telegram 進行驗證。",
        button: "繼續使用 Telegram",
      },
      google: {
        title: "Google 登入",
        description: "使用 Google 帳戶登入。",
        button: "繼續使用 Google",
      },
    },
    page: {
      dashboard: {
        title: "儀表板",
        description: "您的即時平台概覽",
      },
      chat: {
        title: "即時聊天",
        description: "即時訊息體驗",
      },
      socket: {
        title: "WebSocket 監控",
        description: "監控 websocket 連線狀態",
      },
      notification: {
        title: "通知",
        description: "管理推播通知設定",
      },
      profile: {
        title: "個人資料",
        description: "管理您的個人帳戶",
      },
    },
    dashboard: {
      cards: {
        onlineUsers: "線上使用者",
        messages: "訊息",
        notifications: "通知",
        rooms: "房間",
      },
      recentActivity: "近期活動",
      systemStatus: "系統狀態",
      googleLogin: "Google 登入",
      websocket: "WebSocket",
      pushNotification: "推播通知",
      connected: "已連線",
      enabled: "已啟用",
      activities: ["Tom 已加入聊天室", "Amy 傳送了一則訊息", "已發送推播通知", "Google 登入成功"],
    },
    chat: {
      title: "聊天室",
      typeMessage: "輸入訊息...",
      rooms: ["一般", "Vue", "Node", "前端"],
      messages: {
        hello: "哈囉",
        hi: "嗨",
      },
    },
    socket: {
      status: "狀態",
      users: "線上人數",
      events: "事件",
      eventStream: "事件串流",
      onlineUsers: "線上使用者",
      lastSeen: "最後上線時間",
      recentEvents: "近期事件",
      noEvents: "目前沒有事件",
      connected: "已連線",
      sendHeartbeat: "發送心跳",
      createEvent: "建立事件",
      disconnected: "已中斷連線",
      items: ["14:20 使用者連線", "14:21 收到訊息", "14:22 已發送推播"],
    },
    notification: {
      settings: "通知設定",
      chat: "聊天通知",
      push: "推播通知",
      activity: "活動通知",
      requestPermission: "開啟推播通知",
      refreshPermission: "重新檢查權限",
      openGuide: "前往設定開啟通知",
      sendTest: "傳送測試通知",
      processing: "處理中...",
      history: "近期通知",
      empty: "目前沒有通知",
      connected: "已連線",
      disconnected: "已斷線",
      connecting: "連線中",
      connectionHint: "即時 Socket 連線狀態",
      statusDefault: "目前狀態：尚未開啟通知",
      statusDenied: "目前狀態：已拒絕通知",
      statusGranted: "目前狀態：已開啟通知",
      statusUnsupported: "目前狀態：此瀏覽器不支援通知",
      permissionDefault: "開啟通知以接收最新消息",
      testTitle: "測試推播通知",
      testBody: "這是來自示範伺服器的測試通知",
    },
    profile: {
      title: "個人資料",
      placeholder: "您的個人資料將顯示在此處。",
    },
  },
} as const;

function getValue(target: any, path: string) {
  return path.split(".").reduce((current, key) => {
    if (current && Object.prototype.hasOwnProperty.call(current, key)) {
      return current[key];
    }
    return undefined;
  }, target);
}

function get(path: string) {
  return getValue(messages[locale.value], path);
}

function t(path: string) {
  const value = get(path);
  return typeof value === "string" ? value : path;
}

function useI18n() {
  return {
    locale,
    languageOptions,
    t,
    get,
    messages,
  };
}

export { locale, languageOptions, t, get, messages, useI18n };
