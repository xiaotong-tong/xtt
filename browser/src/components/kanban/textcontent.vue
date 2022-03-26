<template>
    <div class="textContent" ref="textBox">
        <p class="text" :innerHTML="kanbanText" ref="textEl"></p>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
const props = defineProps({
  kanbanText: String
});
const textBox = ref();
const textEl = ref();

watch(props, () => {
    nextTick(() => {
        if (textEl.value.getBoundingClientRect().height > textBox.value.getBoundingClientRect().height) {
            textBox.value.classList.add("text-overflow");
        }
    })
})

const wheelScroll = (ev) => {
    if (textBox.value.classList.contains("text-overflow")) {
        const scrollMoveNum = textBox.value.getBoundingClientRect().height / 10;
        const maxTranslate = textEl.value.getBoundingClientRect().height - textBox.value.getBoundingClientRect().height;
        const currTranslate = +textEl.value.style.transform.match(/-?\d+/);
        let moveY = currTranslate;
        textBox.value.classList.remove("on-scrollend");
        if (ev.wheelDelta < 0) {
            if (currTranslate - scrollMoveNum < 0 - maxTranslate) {
                moveY = 0 - maxTranslate;
                textBox.value.classList.add("on-scrollend");
            } else {
                moveY = currTranslate - scrollMoveNum;
            }
        } else {
            moveY = currTranslate + scrollMoveNum > 0 ? 0 : currTranslate + scrollMoveNum;
        }
        textEl.value.style.transform = `translateY(${moveY}px)`
    }
    
}

defineExpose({
    wheelScroll
})
</script>

<style scoped>
.textContent {
    max-width: 200px;
    max-height: 150px;
    padding-left: .5em;
    padding-right: .5em;
    height: 100%;
    overflow: hidden;
}
.textContent > p {
    margin: 0;
}
.textContent.text-overflow {
    overflow: auto;
    max-width: 220px;
    margin-right: -22px;
}
</style>