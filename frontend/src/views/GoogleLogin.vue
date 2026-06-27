<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl p-8 shadow-sm">
      <h1 class="text-2xl font-semibold mb-4">{{ t("login.google.title") }}</h1>
      <p class="text-slate-600 mb-6">{{ t("login.google.description") }}</p>

      <div id="google-button" class="mb-6"></div>

      <div
        v-if="loginError"
        class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 mb-4"
      >
        ❌ {{ loginError }}
      </div>

      <div v-if="loginSuccess" class="rounded-xl border border-green-200 bg-green-50 p-4">
        <div class="text-green-800 font-semibold mb-3">✅ Google 登入成功</div>
        <div class="flex items-center gap-4">
          <img
            v-if="clientInfo.avatar"
            :src="clientInfo.avatar"
            alt="Google user picture"
            class="w-16 h-16 rounded-full"
          />
          <div>
            <div class="font-medium">{{ clientInfo.name }}</div>
            <div class="text-sm text-slate-600">{{ clientInfo.email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const loginSuccess = ref(false);
const loginError = ref("");
const clientInfo = ref<{ name?: string; email?: string; avatar?: string }>({});

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

async function handleCredentialResponse(response: any) {
  loginError.value = "";
  const idToken = response?.credential;

  if (!idToken) {
    loginError.value = "Google 登入失敗：未取得憑證";
    return;
  }

  try {
    const res = await axios.post(
      `${BACKEND_URL}/auth/google`,
      { id_token: idToken },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const { code, message, data } = res.data;

    if (code == 200) {
      loginSuccess.value = true;
      clientInfo.value = data.user;
      localStorage.setItem("jwt", data.access_token);
      return;
    }

    loginError.value = message;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      loginError.value = error.response?.data?.message || error.message || "Google 登入發生錯誤";
    } else {
      loginError.value = error?.message || "Google 登入發生錯誤";
    }
  }
}

function initGoogleLogin() {
  if (window.google?.accounts?.id) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    const container = document.getElementById("google-button");
    if (container) {
      window.google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: 280,
      });
      window.google.accounts.id.prompt();
    }
  }
}

onMounted(() => {
  if (!document.getElementById("gsiScript")) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.id = "gsiScript";
    document.head.appendChild(script);
    script.onload = initGoogleLogin;
  } else {
    initGoogleLogin();
  }
});
</script>

<style scoped></style>
