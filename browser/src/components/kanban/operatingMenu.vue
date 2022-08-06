<template>
	<div class="operatingMenuContainer textborder1" :style="operatingMenuStyle" ref="textEl" v-show="isOperatingMenu"
		@mousedown="textMove" @mousemove="textMoving" @mouseup="textMoved" @mouseout="textMoved">
		<div class="title">
			有什么事呢？
		</div>
		<div class="main">
			<tab></tab>
			<div class="main-footer">
				当前时间: {{ showTextBrowser("【当前时间-->>all】") }}
			</div>
		</div>
		<div class="closeMenuLink" @click="closeOperatingMenu">
			没什么事
		</div>
	</div>
</template>

<script setup>
import { ref, nextTick, onMounted, reactive } from 'vue';
import { showTextBrowser } from "showText"
import tab from './menu/tab.vue';

let isOperatingMenu = ref(false);

let operatingMenuStyle = reactive({
	top: "calc(100vh - 100px)",
	left: "calc(100vw - 330px)",
	cursor: "",
})

const textEl = ref();
let canMove = false;
let moveStartXY = {
	Y: 0,
	X: 0
};

const kanbanPosition = (...position) => {
	if (position.length === 2) {
		operatingMenuStyle.top = position[0];
		operatingMenuStyle.left = position[1];
	} else {
		return operatingMenuStyle;
	}
}
const textMove = (ev) => {
	const textPosition = textEl.value.getBoundingClientRect();
	operatingMenuStyle.cursor = "move";
	canMove = true;
	moveStartXY = {
		Y: ev.clientY - textPosition.top,
		X: ev.clientX - textPosition.left,
	};
}
const textMoving = (ev) => {
	if (canMove) {
		operatingMenuStyle.top = ev.clientY - moveStartXY.Y + "px";
		operatingMenuStyle.left = ev.clientX - moveStartXY.X + "px";
	}
}
const textMoved = () => {
	canMove = false;
	operatingMenuStyle.cursor = "";
}

const closeOperatingMenu = (ev) => {
	isOperatingMenu.value = false;
	ev?.preventDefault();
}
const openOperatingMenu = () => {
	isOperatingMenu.value = true;
}

defineExpose({
	kanbanPosition,
	openOperatingMenu
})
</script>

<style>
.operatingMenuContainer {
	position: absolute;
	display: flex;
	overflow: hidden;
	padding: .5em;
	font-size: 12px;
	cursor: inherit;
	width: 210px;
	height: 300px;
	flex-direction: column;
	justify-content: space-between;
}

.main {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: space-between;
}

.title {
	margin-bottom: .5em;
}

.closeMenuLink {
	display: list-item;
	list-style: circle inside;
	width: fit-content;
	margin-top: 1em;
}

.closeMenuLink:hover {
	color: var(--color-blue);
}
</style>
