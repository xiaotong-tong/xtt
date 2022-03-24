import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

import router from './router/index.js';

import bg from "./components/bg/bg.vue"

const app = createApp(App);
app.component("bg", bg);
app.use(router);
app.use(createPinia());
app.mount('#app');
