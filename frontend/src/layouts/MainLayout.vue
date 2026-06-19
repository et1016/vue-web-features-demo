<template>
  <div class="flex h-screen bg-slate-100">
    <AppSidebar />

    <div class="flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/AppSidebar.vue";
import AppHeader from "@/components/AppHeader.vue";
</script>

<style scoped></style>
