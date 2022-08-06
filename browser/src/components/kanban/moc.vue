<template>
	<canvas id="live2d" width="170" height="370" class="live2d"></canvas>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
	imgLoad: Function
});

const loadModel = (resourcePath, modelNames) => {
	live2dLoader.resourcesConfig.setResourcesPath(resourcePath)
	live2dLoader.resourcesConfig.setModelNames(modelNames)
	live2dLoader.start();
}

onMounted(() => {
	loadModel("/live2d/models/", ["nami"]);
	props.imgLoad && props.imgLoad();
})
</script>

<style>
</style>