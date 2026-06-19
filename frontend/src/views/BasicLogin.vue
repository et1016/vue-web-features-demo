<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-2xl p-8 shadow-sm">
      <h1 class="text-2xl font-semibold mb-4">{{ t("login.basic.title") }}</h1>
      <p class="text-slate-600 mb-6">{{ t("login.basic.description") }}</p>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700">{{
            t("login.basic.email")
          }}</label>
          <input
            type="email"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">{{
            t("login.basic.password")
          }}</label>
          <input
            type="password"
            class="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
            placeholder="••••••••"
          />
        </div>

        <button
          class="w-full rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 transition"
        >
          {{ t("login.basic.submit") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "@/i18n";
const { t } = useI18n();
</script>

<style scoped></style>
