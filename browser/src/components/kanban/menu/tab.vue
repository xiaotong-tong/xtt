<template>
	<div class="tab-content">
		<ul class="tab-header">
			<li>
				<span class="item" @click="changetab('used')">常用操作</span>
			</li>
			<li>
				<span class="item" @click="changetab('lian')">涟</span>
			</li>
		</ul>
		<hr>
		<section v-if="activeTab === 'used'">
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
			</ul>
		</section>
		<section v-else-if="activeTab === 'lian'">
			<ul class="menuList">
				<li>
					<span class="item" @click="changeImg">更换涟皮肤</span>
				</li>
			</ul>
		</section>
		
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from "../../../store/index.js"
const store = useStore();

const changeImg = (ev) => {
	store.changeBg(ev);
	ev.preventDefault();
}

const activeTab = ref("used");

const changetab = (tabName) => {
	activeTab.value = tabName;
}

</script>

<style scoped>
.tab-content {
	flex: 1;
}
.item:hover {
	color: var(--color-blue);
}

.tab-header {
	display: flex;
}
.tab-header li {
	margin-inline-end: 1em;
}
</style>