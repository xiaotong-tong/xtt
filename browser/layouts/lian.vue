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
              iskanbanShow: true
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
            }, 0);
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
              kanbanEL = this.$refs.kanbanArea;

            if (!kanbanSub) { return; }
            kanbanSub.style.opacity = 1;
            kanbanSub.style.transition = "";

            if (data.intersectionRatio > 0 && data.intersectionRatio < 1) {
              this.kanbanText = "";
              this.kanbanSubText = "要被消失掉了！不要啊！！！";
              
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
              this.iskanbanShow = false;

            } else if (data.intersectionRatio >= 1) {
              if (!this.iskanbanShow) {
                this.kanbanText = "fu~ 得救了~";
                this.kanbanSubText = "";
                this.textHidden(this);

                kanbanSub.style.opacity = 0;
              }
              this.iskanbanShow = true;
            } else if (data.intersectionRatio <= 0) {
              if (!this.iskanbanShow) {
                this.kanbanSubText = "消失了！消失了！消失了！消失了！消失了！消失了！";
                kanbanSub.style.top = data.boundingClientRect.top + "px";
                kanbanSub.style.right = "20px";
                kanbanSub.style.opacity = 0;
                kanbanSub.style.transition = "opacity 5s 3s";
              }
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
