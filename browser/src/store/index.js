import { defineStore } from "pinia";

export const useStore = defineStore("main", {
	state() {
		return {
			bg: "images/lian2.png"
		}
	},
	getters: {},
	actions: {
		changeBg(ev) {
			this.bg = (this.bg === "images/lian2.png" ? "images/lian3.png" : "images/lian2.png");
		}
	}
})
