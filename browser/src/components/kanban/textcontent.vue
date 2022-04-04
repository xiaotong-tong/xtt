<template>
    <div
      class="kanbanText textborder2"
      ref="textEl"
      :style="kanbanTextStyle"
      @mousedown="textMove"
      @mousemove="textMoving"
      @mouseup="textMoved"
      @mouseout="textMoved"
    >
      <div class="textContent" ref="textBox">
        <p class="text" :innerHTML="kanbanText" ref="textContentEl"></p>
      </div>
    </div>
</template>

<script setup>
import { ref, nextTick, onMounted, reactive } from 'vue';
import { showTextBrowser } from "showText";

let kanbanText = ref("");
let kanbanTextStyle= reactive({
    top: "calc(100vh - 100px)",
    left: "calc(100vw - 330px)",
    opacity: 0,
    transition: "",
    visibility: "hidden",
    cursor: "",
});
const textAreaHidden = () => {
    setTimeout(() => {
        kanbanTextStyle.opacity = 0;
        kanbanTextStyle.transition = "opacity 5s 3s, visibility 5s 5s";
        kanbanTextStyle.visibility = "hidden"
    }, 100);
}
const textAreaShow = (text, onTextLoaded) => {
    kanbanText.value = showTextBrowser(text);
    nextTick(() => {
        kanbanTextStyle.opacity = 1;
        kanbanTextStyle.transition = "";
        kanbanTextStyle.visibility = "visible";

        if (textContentEl.value.getBoundingClientRect().height > textBox.value.getBoundingClientRect().height) {
            textBox.value.classList.add("text-overflow");
        }
        onTextLoaded && onTextLoaded();
    });
}
const textAreaShowThenHide = (text) => {
    textAreaShow(text, textAreaHidden);
}

const textEl = ref();

const textBox = ref();
const textContentEl = ref();
let canMove = false;
let moveStartXY= {
    Y: 0,
    X: 0
};

const kanbanPosition = (...position) => {
    if (position.length === 2) {
        kanbanTextStyle.top = position[0];
        kanbanTextStyle.left = position[1];
    } else {
        return kanbanTextStyle;
    }
}

const textMove = (ev) => {
    const textPosition = textEl.value.getBoundingClientRect();
    kanbanTextStyle.cursor = "move";
    canMove = true;
    moveStartXY = {
        Y: ev.clientY - textPosition.top,
        X: ev.clientX - textPosition.left,
    };
}
const textMoving = (ev) => {
    if (canMove) {
        kanbanTextStyle.top = ev.clientY - moveStartXY.Y + "px";
        kanbanTextStyle.left = ev.clientX - moveStartXY.X + "px";
    }
}
const textMoved= () => {
    canMove = false;
    kanbanTextStyle.cursor = "";
}

onMounted(() => {
    // 当文字区域滚动时 触发 wheelScroll方法。
    textEl.value.addEventListener("wheel", (ev) => {
        if (textBox.value.classList.contains("text-overflow")) {
            const scrollMoveNum = textBox.value.getBoundingClientRect().height / 10;
            const maxTranslate = textContentEl.value.getBoundingClientRect().height - textBox.value.getBoundingClientRect().height;
            const currTranslate = +textContentEl.value.style.transform.match(/-?\d+/);
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
            textContentEl.value.style.transform = `translateY(${moveY}px)`
        }
    });
})


defineExpose({
    textAreaShow,
    textAreaHidden,
    textAreaShowThenHide,
    kanbanPosition,
})
</script>

<style scoped>
.kanbanText {
  position: absolute;
  overflow: hidden;
  padding: .5em;
  font-size: 12px;
  cursor: inherit;
}
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