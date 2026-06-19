<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl p-5">
      <h3 class="font-semibold mb-4">{{ t("notification.settings") }}</h3>

      <div class="space-y-3">
        <label class="flex gap-3">
          <input type="checkbox" checked />
          {{ t("notification.chat") }}
        </label>

        <label class="flex gap-3">
          <input type="checkbox" checked />
          {{ t("notification.push") }}
        </label>

        <label class="flex gap-3">
          <input type="checkbox" checked />
          {{ t("notification.activity") }}
        </label>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-5">
      <button class="bg-blue-600 text-white px-5 py-3 rounded-xl">
        {{ t("notification.sendTest") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "@/i18n";
const { t } = useI18n();
</script>

<style scoped></style>
