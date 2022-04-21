<!-- 创建页面背景
    背景由两部分组成 背景图片和 背景遮盖层
    两者皆是 fixed 定位，100% 长和宽

    将图片格式的文件拖拽到本页面，会自动替换当前显示的背景图片

    | defalutImg | string 类型的 path路径 | 设置当前页面显示背景图片,同时会让当前页面的图片拖拽功能失效 |
    | noMark | boolean | 为 true 不显示背景遮盖层
 -->
<template>
    <div class="bg" ref="bgEl"></div>
    <div class="bg-mark" v-if="!props.noMark"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    defalutImg: String,
    noMark: Boolean
})
const bgEl = ref(null);

onMounted(()=> {
    if (localStorage.getItem("bg")) {
        document.documentElement.style.setProperty("--bg-url", `url(${props.defalutImg || localStorage.getItem("bg")})`);
    }
    // 当拖拽到元素上会触发 dragover 事件，此处需要阻止事件的发生。
    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);
    // 当拖拽到元素上并释放时会触发 drop 事件
    document.addEventListener("drop", function(event) {
        if (!props.defalutImg) {
            let file = event.dataTransfer.files[0], reader = new FileReader();
            if (file?.type.includes("image")) {
                reader.readAsDataURL(file);
                reader.onload = function () {
                    document.documentElement.style.setProperty("--bg-url", `url(${this.result})`)
                    localStorage.setItem("bg", this.result);
                };
            }
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
  background-image: var(--bg-url, url(/images/bg.png));
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
