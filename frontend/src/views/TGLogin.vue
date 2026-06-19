<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl p-8 shadow-sm">
      <h1 class="text-2xl font-semibold mb-4">{{ t("login.tg.title") }}</h1>
      <p class="text-slate-600 mb-6">{{ t("login.tg.description") }}</p>
      <button
        class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {{ t("login.tg.button") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "@/i18n";
const { t } = useI18n();
</script>

<style scoped></style>
