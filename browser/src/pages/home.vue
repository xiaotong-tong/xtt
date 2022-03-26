<template>
    <bg></bg>
    <h1 class="not-show">
      小恸恸的个人主页
    </h1>
    <section class="touxiang-wrap not-show">
      <img :src="touxiang" alt="头像" class="touxiang" draggable="false">
      <p class="signature">
        毕竟几人真得鹿 <br>
        不知终日梦为鱼
      </p>
    </section>
    <kanbanarea></kanbanarea>
</template>

<script setup>
import { ref } from 'vue';
import kanbanarea from "../components/kanban/kanbanarea.vue"

const touxiang = "images/lian-title.png";
</script>

<style>
html, body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
</style>