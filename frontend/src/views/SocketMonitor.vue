<template>
  <div>
    <div class="grid grid-cols-3 gap-5">
      <div class="bg-white rounded-2xl p-5">
        <div>Status</div>
        <div class="text-green-500 text-2xl mt-2">Connected</div>
      </div>

      <div class="bg-white rounded-2xl p-5">
        <div>Users</div>
        <div class="text-2xl mt-2">128</div>
      </div>

      <div class="bg-white rounded-2xl p-5">
        <div>Events</div>
        <div class="text-2xl mt-2">4211</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-5 mt-6">
      <h3 class="font-semibold mb-4">Event Stream</h3>

      <div class="space-y-2">
        <div v-for="event in events" :key="event">
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const events = ["14:20 User Connected", "14:21 Message Received", "14:22 Push Sent"];
</script>

<style scoped></style>
