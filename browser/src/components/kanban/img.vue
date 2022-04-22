<template>
	<img :src="kanbanimg" alt="看板娘" class="kanbanimg" @load="kanbanLoad" draggable="false">
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from "../../store/index.js";
const store = useStore();
const props = defineProps({
	imgLoad: Function
});

const kanbanimg = computed(() => store.bg);

const kanbanLoad = () => {
	props.imgLoad && props.imgLoad();
}
</script>

<style scoped>
.kanbanimg {
	width: 150px;
	aspect-ratio: 3 / 4;
	cursor: inherit;
}
</style>