<template>
  <div class="space-y-6">
    <div class="bg-white rounded-2xl p-5">
      <h3 class="font-semibold mb-4">Notification Settings</h3>

      <div class="space-y-3">
        <label class="flex gap-3">
          <input type="checkbox" checked />
          Chat Notification
        </label>

        <label class="flex gap-3">
          <input type="checkbox" checked />
          Push Notification
        </label>

        <label class="flex gap-3">
          <input type="checkbox" checked />
          Activity Notification
        </label>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-5">
      <button class="bg-blue-600 text-white px-5 py-3 rounded-xl">Send Test Notification</button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
