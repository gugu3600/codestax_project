import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routes/router';
import vueDebounce from 'vue-debounce';
import "./assets/style.css";

const app = createApp(App);
app.directive("debounce",vueDebounce({lock : true}));
app.use(router);
app.mount("#app");