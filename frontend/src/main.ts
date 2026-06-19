import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { locale } from "./i18n";

const app = createApp(App);
app.provide("locale", locale);
app.use(router);
app.mount("#app");
