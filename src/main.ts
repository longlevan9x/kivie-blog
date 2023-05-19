import { createApp } from "vue";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { VueMasonryPlugin } from "vue-masonry";

const app = createApp(App);

app.use(VueMasonryPlugin);

app.use(store).use(router).mount("#app");
