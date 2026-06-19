<template>
  <div>
    <div class="grid grid-cols-4 gap-5">
      <div v-for="card in cards" :key="card.title" class="bg-white rounded-2xl p-5 shadow-sm">
        <div class="text-slate-500 text-sm">
          {{ card.title }}
        </div>

        <div class="mt-3 text-3xl font-bold">
          {{ card.value }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-5 mt-6">
      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">Recent Activity</h3>

        <div class="space-y-3">
          <div v-for="item in activities" :key="item" class="text-sm">
            {{ item }}
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-5 shadow-sm">
        <h3 class="font-semibold mb-4">System Status</h3>

        <div class="space-y-4">
          <div class="flex justify-between">
            <span>Google Login</span>
            <span class="text-green-500">Connected</span>
          </div>

          <div class="flex justify-between">
            <span>WebSocket</span>
            <span class="text-green-500">Connected</span>
          </div>

          <div class="flex justify-between">
            <span>Push Notification</span>
            <span class="text-green-500">Enabled</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cards = [
  {
    title: "Online Users",
    value: 128,
  },
  {
    title: "Messages",
    value: 3421,
  },
  {
    title: "Notifications",
    value: 97,
  },
  {
    title: "Rooms",
    value: 12,
  },
];

const activities = [
  "Tom joined chat room",
  "Amy sent a message",
  "Push notification sent",
  "Google login success",
];
</script>

<style scoped></style>
