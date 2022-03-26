import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Text from "../pages/text.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    }, {
        path: "/text",
        name: "text",
        component: Text
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// navigator.userAgent.match(/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i);

export default router;