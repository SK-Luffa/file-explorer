import { createApp } from "vue";
import App from "./App.vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "./assets/main.css";

const app = createApp(App);
app.use(hljsVuePlugin);
app.mount("#app");
