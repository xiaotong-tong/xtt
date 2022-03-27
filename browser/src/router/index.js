import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Text from "../pages/text.vue";
import Lian from "../pages/lian.vue";
import LoveWithYou from "../pages/lovewithyou/index.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    }, {
        path: "/text",
        name: "text",
        component: Text
    }, {
        path: "/lian",
        name: "lian",
        component: Lian
    }
];
routes.push(...[
    {
        path: "/lovewithyou/",
        name: "lovewithyou",
        component: LoveWithYou
    }
])

const router = createRouter({
    history: createWebHistory(),
    routes
});

// navigator.userAgent.match(/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i);

export default router;