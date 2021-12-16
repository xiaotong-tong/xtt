<template>
  <div class="container">
      <section class="inputArea">
        输入区域:
        <div
          contenteditable="true"
          class="inputfield"
          ref="inputfield"
        >
        </div>
        <button
          @click="clickOK"
        >确定</button>
      </section>
      <section class="outputArea">
        输出区域:
        <div class="outputfield" v-html="outputText">
        </div>
      </section>
      <section class="helpArea">
        <ul>
          <li>
            【文本-反转文本>=<输入文本】
          </li>
          <li>
            【文本-取文本左>=<输入文本>=<坐标字符】
          </li>
          <li>
            【文本-取文本右>=<输入文本>=<坐标字符】
          </li>
          <li>
            【文本-取中间>=<输入文本>=<左侧坐标字符>=<右侧坐标字符】
          </li>
           <li>
            【文本-注音>=<输入文本>=<注音】
          </li>
          <li>
            【当前时间】
          </li>
          <li>
            【返回>=<返回内容】 <br>
            无视当前层级的其他输入，直接返回返回内容
          </li>
        </ul>
      </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      outputText: ''
    }
  },
  layout: 'lian',
  methods: {
    clickOK() {
      const inputEl = this.$refs.inputfield

      this.inputText = inputEl.innerText;

      this.outputText = this.$showText.showText(this.inputText);
    }
  }
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
  margin-bottom: 30px;
  padding: .5em;
}
.inputfield {
  box-sizing: border-box;
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: .5em;
  outline: none;
}
.outputfield {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
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
</style>
