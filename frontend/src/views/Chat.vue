<template>
  <div class="bg-white rounded-2xl shadow-sm h-[700px] flex">
    <div class="w-64 border-r">
      <div class="p-4 font-semibold">Chat Rooms</div>

      <div class="space-y-2 p-3">
        <div
          v-for="room in rooms"
          :key="room"
          class="p-3 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          # {{ room }}
        </div>
      </div>
    </div>

    <div class="flex-1 flex flex-col">
      <div class="h-16 border-b px-5 flex items-center"># General</div>

      <div class="flex-1 p-5 space-y-4 overflow-auto">
        <div v-for="msg in messages" :key="msg.id">
          <div class="font-medium">
            {{ msg.user }}
          </div>

          <div class="text-slate-600">
            {{ msg.text }}
          </div>
        </div>
      </div>

      <div class="p-4 border-t">
        <input class="w-full border rounded-xl px-4 py-3" placeholder="Type a message..." />
      </div>
    </div>
  </div>
</template>

<script setup>
const rooms = ["General", "Vue", "Node", "Frontend"];

const messages = [
  {
    id: 1,
    user: "Tom",
    text: "Hello",
  },
  {
    id: 2,
    user: "Amy",
    text: "Hi",
  },
];
</script>

<style scoped></style>
