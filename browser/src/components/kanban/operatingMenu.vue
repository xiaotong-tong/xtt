<template>
	<div class="operatingMenuContainer">
		<div class="title">
			有什么事呢？
		</div>
		<div class="main">
			<ul class="menuList">
				<li>
					<a href="/text" class="item">文本操作类</a>
				</li>
				<li>
					<a href="/" class="item">首页</a>
				</li>
				<li>
					<a href="/lian" class="item">漣の家</a>
				</li>
				<li>
					<a href="/lovewithyou" class="item">恋与你</a>
				</li>
				<li>
					<span class="item" @click="changeImg">更换涟皮肤</span>
				</li>
			</ul>
			<div class="main-footer">
				当前时间: {{ showTextBrowser("【当前时间-->>all】") }}
			</div>
		</div>
		<div class="closeMenuLink" @click="closeMenu">
			没什么事
		</div>
	</div>
</template>

<script setup>
import { showTextBrowser } from "showText"
import { useStore } from "../../store/index.js"
const store = useStore();

const props = defineProps({
	closeMenu: Function
})
const closeMenu = (ev) => {
	props.closeMenu();
	ev.preventDefault();
}
const changeImg = (ev) => {
	store.changeBg(ev);
	ev.preventDefault();
}
</script>

<style>
.operatingMenuContainer {
	display: flex;
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

.menuList {
	flex: 1;
}

.main-footer {}

.closeMenuLink {
	display: list-item;
	list-style: circle inside;
	width: fit-content;
	margin-top: 1em;
}

.closeMenuLink:hover,
.main .item:hover {
	color: var(--color-blue);
}
</style>
