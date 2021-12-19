<template>
  <div class="container">
      <section class="inputArea">
        输入区域:
        <div
          contenteditable="true"
          class="inputfield textborder1"
          ref="inputfield"
        >
        <!-- 【选择>=<【文本-反转文本>=<【文本-反转文本>=<【当前时间>=<时】】】>=<1点了>=<2点了>=<3点了>=<4点了>=<5点了>=<6点了>=<7点了>=<8点了>=<9点了>=<10点了>=<11点了>=<12点了】 -->
        </div>
        <button
          @click="clickOK"
        >确定</button>
      </section>
      <section class="outputArea">
        输出区域:
        <div class="outputfield textborder1" v-html="outputText">
        </div>
      </section>
      <section class="helpArea">
        <ul>
          <li>
            【文本-反转文本&gt=&lt输入文本】
          </li>
          <li>
            【文本-取文本左&gt=&lt输入文本&gt=&lt坐标字符】
          </li>
          <li>
            【文本-取文本右&gt=&lt输入文本&gt=&lt坐标字符】
          </li>
          <li>
            【文本-取中间&gt=&lt输入文本&gt=&lt左侧坐标字符&gt=&lt右侧坐标字符】
          </li>
           <li>
            【文本-注音&gt=&lt输入文本&gt=&lt注音】
          </li>
          <li>
            【当前时间】
          </li>
          <li>
            【返回&gt=&lt返回内容】 <br>
            无视当前层级的其他输入，直接返回返回内容
          </li>
          <li>
            【选择&gt=&lt数字1-n&gt=&lt1&gt=&lt2...&gt=&ltn】 <br>
              根据数字1-n的值返回相对应的值
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
</style>
