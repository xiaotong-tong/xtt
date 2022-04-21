<template>
    <bg></bg>
  <div class="container">
      <section class="inputArea">
        输入区域:
        <div
          contenteditable="true"
          class="inputfield textborder1"
          ref="inputfield"
        >
        </div>
        <button
          class="copyBtn"
          @click="copyInputText"
        >复制</button>
        <button
          @click="clickOK"
        >确定</button>
      </section>
      <section class="outputArea">
        输出区域:
        <div
          class="outputfield textborder1"
          v-html="outputText"
          ref="outputfield"
        >
        </div>
        <button
          class="copyBtn"
          @click="copyOutputText"
        >复制</button>
      </section>
      <section class="helpArea">
        <ul>
          <li>
            【文本-反转文本-->>输入文本】
          </li>
          <li>
            【文本-取文本左-->>输入文本-->>坐标字符】
          </li>
          <li>
            【文本-取文本右-->>输入文本-->>坐标字符】
          </li>
          <li>
            【文本-取中间-->>输入文本-->>左侧坐标字符-->>右侧坐标字符】
          </li>
           <li>
            【文本-注音-->>输入文本-->>注音】
          </li>
          <li>
            【当前时间】
          </li>
          <li>
            【返回-->>返回内容】 <br>
            无视当前层级的其他输入，直接返回返回内容
          </li>
          <li>
            【选择-->>数字1-n-->>1-->>2...-->>n】 <br>
              根据数字1-n的值返回相对应的值
          </li>
        </ul>
      </section>
  </div>
  <kanbanarea></kanbanarea>
</template>

<script setup>
import { ref } from "vue";
import kanbanarea from "../components/kanban/kanbanarea.vue"
import { showTextBrowser } from "showText"

const inputText = ref("");
const outputText = ref("");
const inputfield = ref(null);
const outputfield = ref(null);

const clickOK = () => {
    inputText.value = inputfield.value.innerText;
    outputText.value = showTextBrowser(inputText.value);
}
const copyInputText = async () => {
    const res = await navigator.clipboard?.writeText(inputfield.value.innerText)
    console.log("复制成功啦");
}

const copyOutputText = async () => {
    const res = await navigator.clipboard?.write(
        [
            new ClipboardItem({
                'text/html': new Blob(
                    [outputfield.value.innerHTML],
                    {type: 'text/html'}
                )
            })
        ]
    );
    console.log(res)
}
</script>

<style scoped>
.container {
  width: calc(100vw - 400px);
  margin: 0 auto;
  background-color: #fff;
  min-height: 100vh;
}
.inputArea,
.outputArea {
  position: relative;
  margin-bottom: 30px;
  padding: .5em;
}
.inputfield {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  padding: .5em;
  outline: none;
}
.outputfield {
  box-sizing: border-box;
  width: 100%;
  padding: .5em;
  min-height: 150px;
}
.helpArea {
  width: 180px;
  position: absolute;
  top: 0;
  right: .3em;
  background-color: #fff;
  font-size: 12px;
}
.helpArea li {
  margin-bottom: 1em;
}
.copyBtn {
  all: unset;
  color: var(--color-blue);
  position: absolute;
  top: 2em;
  right: 1em;
}
</style>
