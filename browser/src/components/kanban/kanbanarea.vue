<template>
    <section
      class="imgArea"
      ref="imgEl"
      :style="kanbanAreaStyle"
      @mousedown="imgMove"
      @mousemove="imgMoving"
      @mouseup="imgMoved"
      @mouseout="imgMoved"
      @dblclick="operatingMenuShow"
    >
      <kanbanimg :imgLoad="imgLoad"></kanbanimg>
    </section>

    <textcontent ref="textContentEl"></textcontent>

    <div
      class="kanbanText textborder1"
      v-show="isOperatingMenu"
      ref="operatingMenuEl"
      :style="operatingMenuStyle"
      @mousedown="textMove"
      @mousemove="textMoving"
      @mouseup="imgMoved"
      @mouseout="imgMoved"
    >
      <operatingMenu :closeMenu="closeOperatingMenu"></operatingMenu>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import kanbanimg from "./img.vue";
import operatingMenu from "./operatingMenu.vue"
import textcontent from './textcontent.vue';

const imgEl = ref();

const operatingMenuEl = ref();
const textContentEl = ref();

let canMove = false;
let kanbanAreaStyle= reactive({
    top: "calc(100vh - 220px)",
    left: "calc(100vw - 170px)",
    cursor: "",
})
let moveStartXY= {
    Y: 0,
    X: 0
};

let isOperatingMenu = ref(false);

let operatingMenuStyle = reactive({
    top: "calc(100vh - 100px)",
    left: "calc(100vw - 330px)",
})

const kanbanTextLoad = () => {
    nextTick(() => {
        const kanbanPosition = JSON.parse(localStorage.getItem("kanbanPosition"));
        textContentEl.value.kanbanPosition(kanbanPosition.textXY.Y + "px", kanbanPosition.textXY.X + "px");
    });
};
const imgLoad = () => {
    const kanbanPosition = JSON.parse(localStorage.getItem("kanbanPosition"));
    imgEl.value.style.opacity = 1;
    if (kanbanPosition) {
        kanbanAreaStyle.top = kanbanPosition.imgXY.Y + "px";
        kanbanAreaStyle.left = kanbanPosition.imgXY.X + "px";
    }
    textContentEl.value.textAreaShowThenHide("初次见面,我是看板娘【空格】【文本-注音-->>涟-->>なみ】，请多多关照");
    kanbanTextLoad();
};

const imgMove = (ev) => {
    const imgPosition = imgEl.value.getBoundingClientRect();
    kanbanAreaStyle.cursor = "move";
    canMove = true;
    moveStartXY = {
        Y: ev.clientY - imgPosition.top,
        X: ev.clientX - imgPosition.left,
    };
}
const imgMoving = (ev) => {
    if (canMove) {
        kanbanAreaStyle.top = ev.clientY - moveStartXY.Y + "px";
        kanbanAreaStyle.left = ev.clientX - moveStartXY.X + "px";
    }
}
const imgMoved= () => {
    canMove = false;
    kanbanAreaStyle.cursor = "";
}

let iskanbanShow = {
    startState: 1,
    runState: false,
    isBack: false
};
const kanbanShow = (entries) => {
    const data = entries[0], 
    // hidden01234 从显示到隐藏 1 .75 .5 .25 0
    // show01234 从隐藏到显示 0 .25 .5 .75 1
    visibilityText = {
        hidden0: "",
        hidden1: "是要和涟玩捉迷藏吗？",
        hidden2: "涟准备藏好一点，不要被找到了",
        hidden3: "这个位置还可以，再找找其他地方吧",
        hidden4: "嘿嘿~涟感觉藏这个位置不错，哥哥肯定找不到的！",
        hidden5: "哥哥快来找我呀~",
        show0: "哥哥怎么还不来找我呀",
        show1: "看不见我 看不见我",
        show2: "看不见我 看不见我 看不见我",
        show3: "被发现拉，哥哥是怎么找到我的呢？",
        show4: "哥哥快拉我出去啦~",
        show5: "fu~ 好开心~"
    };
    switch (true) {
        case data.intersectionRatio >= 1: {
            if (iskanbanShow.runState && !iskanbanShow.isBack) {
                textContentEl.value.textAreaHidden();
                break;
            }
            if (iskanbanShow.runState && iskanbanShow.isBack) {
                textContentEl.value.textAreaShow(visibilityText.show5);
                iskanbanShow.isBack = false;
            }
            iskanbanShow.runState = false;
            textContentEl.value.textAreaHidden();
            break;
        }
        case data.intersectionRatio >= 0.75: {
            textContentEl.value.textAreaShow(iskanbanShow.isBack ? visibilityText.show4 : visibilityText.hidden1);
            iskanbanShow.runState = true;
            break;
        }
        case data.intersectionRatio >= 0.5: {
            textContentEl.value.textAreaShow(iskanbanShow.isBack ? visibilityText.show3 : visibilityText.hidden2);
            iskanbanShow.runState = true;
            break;
        }
        case data.intersectionRatio >= 0.25: {
            textContentEl.value.textAreaShow(iskanbanShow.isBack ? visibilityText.show2 : visibilityText.hidden3);
            iskanbanShow.runState = true;
            break;
        }
        case data.intersectionRatio > 0: {
            textContentEl.value.textAreaShow(iskanbanShow.isBack ? visibilityText.show1 : visibilityText.hidden4);
            iskanbanShow.runState = true;
            break;
        }
        case data.intersectionRatio <= 0: {
            if (iskanbanShow.runState) {
                textContentEl.value.textAreaShowThenHide(iskanbanShow.isBack ? visibilityText.show0 : visibilityText.hidden5);
            }
            iskanbanShow.isBack = true;
            break;
        }
    }
}

const operatingMenuShow = () => {
    const kanbanTextStyle = textContentEl.value.kanbanPosition()
    isOperatingMenu.value = true;
    operatingMenuStyle.top = parseInt(kanbanTextStyle.top) - 170 + "px"
    operatingMenuStyle.left = parseInt(kanbanTextStyle.left) - 20 + "px"
}
const closeOperatingMenu =() => {
    isOperatingMenu.value = false;
}

onMounted(() => {
    const kanbanVisibility = () => {
        if (!imgEl.value) {
            return;
        }
        const imgPosition = imgEl.value.getBoundingClientRect();
        const textPosition = textContentEl.value.kanbanPosition();

        if (document.visibilityState === "visible") {
            textContentEl.value.textAreaShowThenHide("欢迎回来，要再陪涟玩一会吗?");
            kanbanTextLoad();
        } else {
            const position = {
                imgXY: {
                    X: parseInt(imgPosition.left),
                    Y: parseInt(imgPosition.top)
                },
                textXY: {
                    X: parseInt(textPosition.left),
                    Y: parseInt(textPosition.top)
                }
            };
            textContentEl.value.textAreaShowThenHide("要走了吗？那就下次再见啦~");
            localStorage.setItem("kanbanPosition", JSON.stringify(position));
        }
    }
    document.addEventListener("visibilitychange", kanbanVisibility);

    let intersection = new IntersectionObserver(kanbanShow, {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    });
    intersection.observe(imgEl.value);
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
.imgArea {
  position: fixed;
}
</style>