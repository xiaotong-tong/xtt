<template>
	<bg></bg>
	<h1 class="not-show">
		小恸恸的个人主页
	</h1>
	<kanbanarea></kanbanarea>
</template>

<script setup>
import { ref } from 'vue';
import kanbanarea from "../components/kanban/kanbanarea.vue"
</script>

<style>
html,
body {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
</style>