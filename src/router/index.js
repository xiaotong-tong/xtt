import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue";
import Text from "../pages/text.vue";
import Lian from "../pages/lian.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/text",
		name: "text",
		component: Text
	},
	{
		path: "/lian",
		name: "lian",
		component: Lian
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
