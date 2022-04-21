<template>
    <bg :defalutImg="defalutImg" :noMark="true"></bg>
    <h1 class="title">恋与你</h1>
    <!-- <kanbanarea></kanbanarea> -->
</template>

<script setup>
import { ref, onMounted } from 'vue';
import kanbanarea from "../../components/kanban/kanbanarea.vue"
const defalutImg = "lovewithyou/images/menu-bg.png"

</script>

<style scoped>
@font-face {
    font-family: "Muyao";
    src: url("/lovewithyou/fonts/Muyao.ttf");
}
.title {
    font-family: "Muyao";
    font-size: 36px;
    color: #DB97D5;
}
</style>