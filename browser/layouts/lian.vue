<template>
  <div>
    <div
        class="bg"
        ref="bg"
        :style= "{'backgroundImage': ( 'url(' + bg + ')' )}"
      ></div>
    <div class="bg-mark"></div>
    <section
      class="kanbanArea"
      ref="kanbanArea"
      :style="{top: (kanbanAreaTop), left: (kanbanAreaLeft)}"
      @mousedown="kanbanMove"
      @mousemove="kanbanMoving"
      @mouseup="kanbanMoved"
      @mouseout="kanbanMoved"
    >
      <div
        class="dialogText"
        v-if="kanbanText"
        :style="kanbanTextStyle">
        {{ kanbanText }}
      </div>
      <img :src="kanban" alt="看板娘" class="kanban" @load="kanbanLoad" draggable="false">
    </section>
    <div
      class="subDialogText"
      ref="kanbanSubText"
    >
      {{ kanbanSubText }}
    </div>

    <nuxt />
  </div>
</template>

<script>
    export default {
        name: "lian",
        data() {
            return {
              kanban: "https://myfilegal.cn/images/xtt/%E6%B6%9F2.png",
              bg: "https://myfilegal.cn/images/xtt/bg.jpg",
              kanbanAreaTop: "calc(100vh - 220px)",
              kanbanAreaLeft: "calc(100vw - 170px)",
              kanbanText: "",
              kanbanTextStyle: {},
              kanbanSubText: "",
              canMove: false,
              moveStartXY: {
                Y: 0,
                X: 0
              },
              iskanbanShow: {
                startState: 1,
                runState: false,
                isBack: false
              }
            }
        },
        methods: {
          textHidden(self) {
            self.kanbanTextStyle = {
              opacity: 1,
              transition: ""
            };
            setTimeout(() => {
              self.kanbanTextStyle = {
                opacity: 0,
                transition: "opacity 5s 3s"
              }
            }, 100);
          },
          kanbanLoad() {
            const self = this,
              kanbanEL = this.$refs.kanbanArea;

            if (localStorage.getItem("kanbanXY")) {
              kanbanEL.style.top =  JSON.parse(localStorage.getItem("kanbanXY")).Y + "px";
              kanbanEL.style.left = JSON.parse(localStorage.getItem("kanbanXY")).X + "px";
            }
            
            this.kanbanText = "初次见面,我是看板娘 涟，请多多关照";
            this.textHidden(this);
          },
          kanbanVisibility() {
            const self = this,
              kanbanEL = this.$refs.kanbanArea && this.$refs.kanbanArea.getBoundingClientRect();

            if (!kanbanEL) { return; }
            if (document.visibilityState === 'visible') {
              this.kanbanText = "欢迎回来，要再陪涟玩一会吗?";
            } else {
              this.kanbanText = "要走了吗？那就下次再见啦~";
              localStorage.setItem("kanbanXY", JSON.stringify({
                X: kanbanEL.left,
                Y: kanbanEL.top
              }));
            }
            this.textHidden(this);
          },
          kanbanMove(ev) {
            const kanbanEL = this.$refs.kanbanArea.getBoundingClientRect();
            this.canMove = true;
            this.moveStartXY = {
              Y: ev.clientY - kanbanEL.top,
              X: ev.clientX - kanbanEL.left,
            }
          },
          kanbanMoving(ev) {
            if(this.canMove) {
              const kanbanEL = this.$refs.kanbanArea;
              
              kanbanEL.style.top = ev.clientY - this.moveStartXY.Y + 'px';
              kanbanEL.style.left = ev.clientX - this.moveStartXY.X + 'px';
            }
          },
          kanbanMoved(ev) {
            this.canMove = false;
          },
          kanbanShow(entries) {
            const data = entries[0],
              kanbanSub = this.$refs.kanbanSubText,
              kanbanEL = this.$refs.kanbanArea,
              // hidden01234 从显示到隐藏 1 .75 .5 .25 0
              // show01234 从隐藏到显示 0 .25 .5 .75 1
              visibilityText = {
                hidden0: '',
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

            if (!kanbanSub) { return; }
            kanbanSub.style.opacity = 1;
            kanbanSub.style.transition = "";

            switch(true) {
              case data.intersectionRatio >= 1: {
                if (this.iskanbanShow.runState && this.iskanbanShow.isBack) {
                  this.kanbanText = visibilityText.show5;
                  this.kanbanSubText = "";
                  this.textHidden(this);

                  kanbanSub.style.opacity = 0;
                  this.iskanbanShow.isBack = false;
                }
                this.iskanbanShow.runState= false;
                break;
              }
              case data.intersectionRatio >= .75: {
                this.kanbanText = "";
                this.kanbanSubText = this.iskanbanShow.isBack ? visibilityText.show4 : visibilityText.hidden1;
                
                this.kanbanSubPosition(data);
                this.iskanbanShow.runState= true;
                break;
              }
              case data.intersectionRatio >= .5: {
                this.kanbanText = "";
                this.kanbanSubText = this.iskanbanShow.isBack ? visibilityText.show3 : visibilityText.hidden2;
                
                this.kanbanSubPosition(data);
                this.iskanbanShow.runState= true;
                break;
              }
              case data.intersectionRatio >= .25: {
                this.kanbanText = "";
                this.kanbanSubText = this.iskanbanShow.isBack ? visibilityText.show2 : visibilityText.hidden3;
                
                this.kanbanSubPosition(data);
                this.iskanbanShow.runState= true;
                break;
              }
              case data.intersectionRatio > 0: {
                this.kanbanText = "";
                this.kanbanSubText = this.iskanbanShow.isBack ? visibilityText.show1 : visibilityText.hidden4;
                
                this.kanbanSubPosition(data);
                this.iskanbanShow.runState= true;
                break;
              }
              case data.intersectionRatio <= 0: {
                if (this.iskanbanShow.runState) {
                  this.kanbanSubText = this.iskanbanShow.isBack ? visibilityText.show0 : visibilityText.hidden5;
                  kanbanSub.style.top = data.boundingClientRect.top + "px";
                  kanbanSub.style.right = "20px";
                  kanbanSub.style.opacity = 0;
                  kanbanSub.style.transition = "opacity 5s 3s";
                }
                // this.iskanbanShow.runState = false;
                this.iskanbanShow.isBack = true;
                break;
              }
            }
          },
          kanbanSubPosition(data) { 
            const kanbanSub = this.$refs.kanbanSubText;

            if ((data.boundingClientRect.left + data.boundingClientRect.width) > data.rootBounds.width) {
              kanbanSub.style.left = "";
              kanbanSub.style.right = "20px";
            } else if(data.boundingClientRect.left < 0) {
              kanbanSub.style.left = "20px";
              kanbanSub.style.right = "";
            } else {
              kanbanSub.style.left = data.boundingClientRect.left + "px";
            }

            if (data.boundingClientRect.top < 0) {
              kanbanSub.style.top = "60px";
              kanbanSub.style.left = data.boundingClientRect.left - 150 + "px";
            } else {
              kanbanSub.style.top = data.boundingClientRect.top + "px";
            }
          }
        },
        mounted() {
          const self = this;
          const kanbanEL = this.$refs.kanbanArea;

          // 监听图片显隐
          document.addEventListener("visibilitychange", this.kanbanVisibility);
          let kanbanShow = new IntersectionObserver(this.kanbanShow, {
            threshold: [0, .25, .5, .75, 1]
          });
          kanbanShow.observe(this.$refs.kanbanArea);

          // 拖拽图片
          document.addEventListener("dragover", function( event ) {
            event.preventDefault();
          }, false);
          document.addEventListener("drop", function( event ) {
            let file = event.dataTransfer.files[0],
              reader = new FileReader();

            if(file.type.includes("image")) {
              reader.readAsDataURL(file);
              reader.onload = function() {
                self.bg = this.result;
                self.$refs.bg.style.backgroundImage = "url('" + this.result + "')";
                localStorage.setItem("bg", this.result);
              }
            }
            event.preventDefault();
          });
          if (localStorage.getItem("bg")) {
            this.bg = localStorage.getItem("bg");
          }

        }
    }
</script>

<style scoped>
.kanbanArea {
  position: fixed;
}
.kanban {
  width: 150px;
  aspect-ratio: 3 / 4;
}
.dialogText {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  max-width: 150px;
  margin-bottom: 1.5em;
  padding: .5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
}
.subDialogText {
  position: fixed;
  max-width: 150px;
  padding: .5em;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  transform: translateY(-100%);
}

.bg {
  position: fixed;
  inset: 0;
  opacity: .6;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  z-index: -9;
}
.bg-mark {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fffc;
  z-index: -8;
}
</style>
