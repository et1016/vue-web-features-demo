<template>
  <div class="grid grid-cols-1 gap-6">
    <div class="bg-white rounded-2xl p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-4">{{ t("profile.title") }}</h3>
      <p class="text-slate-600">{{ t("profile.placeholder") }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "@/i18n";
const { t } = useI18n();
</script>

<style scoped></style>
