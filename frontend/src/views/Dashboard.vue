<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="card in cards" :key="card.key" class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="text-slate-500 text-sm">
          {{ t(card.key) }}
        </div>

        <div class="mt-3 text-3xl font-bold">
          {{ card.value }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-5 mt-6">
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">{{ t("dashboard.recentActivity") }}</h3>

        <div class="space-y-3">
          <div v-for="item in activities" :key="item" class="text-sm">
            {{ item }}
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">{{ t("dashboard.systemStatus") }}</h3>

        <div class="space-y-4">
          <div class="flex justify-between">
            <span>{{ t("dashboard.googleLogin") }}</span>
            <span class="text-green-500">{{ t("dashboard.connected") }}</span>
          </div>

          <div class="flex justify-between">
            <span>{{ t("dashboard.websocket") }}</span>
            <span class="text-green-500">{{ t("dashboard.connected") }}</span>
          </div>

          <div class="flex justify-between">
            <span>{{ t("dashboard.pushNotification") }}</span>
            <span class="text-green-500">{{ t("dashboard.enabled") }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n";

const { t, get } = useI18n();

const cards = [
  {
    key: "dashboard.cards.onlineUsers",
    value: 128,
  },
  {
    key: "dashboard.cards.messages",
    value: 3421,
  },
  {
    key: "dashboard.cards.notifications",
    value: 97,
  },
  {
    key: "dashboard.cards.rooms",
    value: 12,
  },
];

const activities = computed(() => get("dashboard.activities") ?? []);
</script>

<style scoped></style>
