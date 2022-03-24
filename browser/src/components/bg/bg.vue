<!-- 创建页面背景
    背景由两部分组成 背景图片和 背景遮盖层
    两者皆是 fixed 定位，100% 长和宽

    还有一个功能为 将图片格式的文件拖拽到本页面，会自动替换当前显示的背景图片
 -->
<template>
    <div class="bg" ref="bgEl"></div>
    <div class="bg-mark"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const bgEl = ref(null);

onMounted(()=> {
    if (localStorage.getItem("bg")) {
        bgEl.value.style.setProperty("--bg-url", `url(${localStorage.getItem("bg")})`);
    }
    // 当拖拽到元素上会触发 dragover 事件，此处需要阻止事件的发生。
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);
    // 当拖拽到元素上并释放时会触发 drop 事件
    document.addEventListener("drop", function(event) {
        let file = event.dataTransfer.files[0], reader = new FileReader();
        if (file?.type.includes("image")) {
            reader.readAsDataURL(file);
            reader.onload = function () {
                bgEl.value.style.setProperty("--bg-url", `url(${this.result})`)
                localStorage.setItem("bg", this.result);
            };
        }
        event.preventDefault();
    });
});
</script>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  opacity: .6;
  background-image: var(--bg-url, url(images/bg.png));
  background-size: cover;
  z-index: -9;
}
.bg-mark {
  position: fixed;
  inset: 0;
  background-color: #fffc;
  z-index: -8;
}
</style>
