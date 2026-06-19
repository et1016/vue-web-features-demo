<template>
  <div>
    <div class="grid grid-cols-3 gap-5">
      <div class="bg-white rounded-2xl p-5">
        <div>{{ t("socket.status") }}</div>
        <div class="text-green-500 text-2xl mt-2">{{ t("socket.connected") }}</div>
      </div>

      <div class="bg-white rounded-2xl p-5">
        <div>{{ t("socket.users") }}</div>
        <div class="text-2xl mt-2">128</div>
      </div>

      <div class="bg-white rounded-2xl p-5">
        <div>{{ t("socket.events") }}</div>
        <div class="text-2xl mt-2">4211</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-5 mt-6">
      <h3 class="font-semibold mb-4">{{ t("socket.eventStream") }}</h3>

      <div class="space-y-2">
        <div v-for="event in events" :key="event">
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n";

const { get, t } = useI18n();
const events = computed(() => get("socket.items") ?? []);
</script>

<style scoped></style>
