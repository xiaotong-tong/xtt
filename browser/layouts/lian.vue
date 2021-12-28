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
      :style="kanbanAreaStyle"
      @mousedown="imgMove"
      @mousemove="imgMoving"
      @mouseup="imgMoved"
      @mouseout="imgMoved"
      @dblclick="operatingMenuShow"
    >
      <img :src="kanban" alt="看板娘" class="kanbanimg" @load="kanbanLoad" draggable="false">
    </section>
    <div
      class="kanbanText textborder1"
      ref="kanbanText"
      v-show="!isOperatingMenu"
      :style="kanbanTextStyle"
      @mousedown="textMove"
      @mousemove="textMoving"
      @mouseup="imgMoved"
      @mouseout="imgMoved"
    >
      <div class="normalText">
        {{ kanbanText }}
      </div>
    </div>

    <div
      class="kanbanText textborder1"
      v-show="isOperatingMenu"
      ref="operatingMenu"
      @mousedown="textMove"
      @mousemove="textMoving"
      @mouseup="imgMoved"
      @mouseout="imgMoved"
    >
      <OperatingMenu @closeMenu="closeOperatingMenu" @changImg="changeKanBanImg"></OperatingMenu>
    </div>
    <nuxt />
  </div>
</template>

<script>
import OperatingMenu from "~/components/operatingMenu.vue";
    export default {
    name: "lian",
    data() {
        return {
            kanban: "images/lian2.png",
            bg: "images/bg.jpg",
            kanbanAreaStyle: {
                top: "calc(100vh - 220px)",
                left: "calc(100vw - 170px)",
            },
            kanbanText: "",
            kanbanTextStyle: {
                top: "calc(100vh - 100px)",
                left: "calc(100vw - 330px)",
            },
            canMove: false,
            moveStartXY: {
                Y: 0,
                X: 0
            },
            iskanbanShow: {
                startState: 1,
                runState: false,
                isBack: false
            },
            isOperatingMenu: false
        };
    },
    methods: {
        textHidden() {
            const self = this, textEL = this.$refs.kanbanText;
            textEL.style.opacity = 1;
            textEL.style.transition = "";
            setTimeout(() => {
                textEL.style.opacity = 0;
                textEL.style.transition = "opacity 5s 3s, visibility 5s 5s";
                textEL.style.visibility = "hidden"
            }, 100);
        },
        textShow(text) {
            this.kanbanText = text;
            this.$nextTick(() => {
                const textEL = this.$refs.kanbanText;
                textEL.style.opacity = 1;
                textEL.style.transition = "";
                textEL.style.visibility = "visible"
            });
        },
        kanbanLoad() {
            const imgEl = this.$refs.kanbanArea, kanbanPosition = JSON.parse(localStorage.getItem("kanbanPosition"));
            imgEl.style.opacity = 1;
            if (kanbanPosition) {
                imgEl.style.top = kanbanPosition.imgXY.Y + "px";
                imgEl.style.left = kanbanPosition.imgXY.X + "px";
            }
            this.textShow("初次见面,我是看板娘 涟，请多多关照");
            // this.textHidden();
            this.kanbanTextLoad();
        },
        kanbanTextLoad() {
            this.$nextTick(() => {
                const textEL = this.$refs.kanbanText, kanbanPosition = JSON.parse(localStorage.getItem("kanbanPosition"));
                if (kanbanPosition) {
                    textEL.style.top = kanbanPosition.textXY.Y + "px";
                    textEL.style.left = kanbanPosition.textXY.X + "px";
                }
            });
        },
        kanbanVisibility() {
            const imgEL = this.$refs.kanbanArea, textEL = this.$refs[this.isOperatingMenu ? "operatingMenu" : "kanbanText"],
                imgPosition = imgEL?.getBoundingClientRect(), textPosition = textEL?.getBoundingClientRect();

            if (!imgPosition) {
                return;
            }
            if (document.visibilityState === "visible") {
                this.textShow("欢迎回来，要再陪涟玩一会吗?");
                this.kanbanTextLoad();
            }
            else {
                const position = {
                    imgXY: {
                        X: imgPosition.left,
                        Y: imgPosition.top
                    },
                    textXY: {
                        X: textPosition.left,
                        Y: textPosition.top
                    }
                };
                this.textShow("要走了吗？那就下次再见啦~");
                localStorage.setItem("kanbanPosition", JSON.stringify(position));
            }
            this.textHidden();
        },
        imgMove(ev) {
            const imgPosition = this.$refs.kanbanArea.getBoundingClientRect();
            this.$refs.kanbanArea.style.cursor = "move";
            this.canMove = true;
            this.moveStartXY = {
                Y: ev.clientY - imgPosition.top,
                X: ev.clientX - imgPosition.left,
            };
        },
        textMove(ev) {
            const textPosition = this.$refs[this.isOperatingMenu ? "operatingMenu" : "kanbanText"]?.getBoundingClientRect();
            this.$refs.kanbanText.style.cursor = "move";
            this.canMove = true;
            this.moveStartXY = {
                Y: ev.clientY - textPosition.top,
                X: ev.clientX - textPosition.left,
            };
        },
        imgMoving(ev) {
            if (this.canMove) {
                const imgEL = this.$refs.kanbanArea;
                imgEL.style.top = ev.clientY - this.moveStartXY.Y + "px";
                imgEL.style.left = ev.clientX - this.moveStartXY.X + "px";
            }
        },
        textMoving(ev) {
            if (this.canMove) {
                const textEL = this.$refs[this.isOperatingMenu ? "operatingMenu" : "kanbanText"];
                textEL.style.top = ev.clientY - this.moveStartXY.Y + "px";
                textEL.style.left = ev.clientX - this.moveStartXY.X + "px";
            }
        },
        imgMoved() {
            this.canMove = false;
            this.$refs.kanbanArea.style.cursor = "";
            this.$refs.kanbanText.style.cursor = "";
        },
        kanbanShow(entries) {
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
                    if (this.iskanbanShow.runState && !this.iskanbanShow.isBack) {
                        this.textHidden();
                        break;
                    }
                    if (this.iskanbanShow.runState && this.iskanbanShow.isBack) {
                        this.textShow(visibilityText.show5);
                        this.iskanbanShow.isBack = false;
                    }
                    this.iskanbanShow.runState = false;
                    this.textHidden();
                    break;
                }
                case data.intersectionRatio >= 0.75: {
                    this.textShow(this.iskanbanShow.isBack ? visibilityText.show4 : visibilityText.hidden1);
                    this.iskanbanShow.runState = true;
                    break;
                }
                case data.intersectionRatio >= 0.5: {
                    this.textShow(this.iskanbanShow.isBack ? visibilityText.show3 : visibilityText.hidden2);
                    this.iskanbanShow.runState = true;
                    break;
                }
                case data.intersectionRatio >= 0.25: {
                    this.textShow(this.iskanbanShow.isBack ? visibilityText.show2 : visibilityText.hidden3);
                    this.iskanbanShow.runState = true;
                    break;
                }
                case data.intersectionRatio > 0: {
                    this.textShow(this.iskanbanShow.isBack ? visibilityText.show1 : visibilityText.hidden4);
                    this.iskanbanShow.runState = true;
                    break;
                }
                case data.intersectionRatio <= 0: {
                    if (this.iskanbanShow.runState) {
                        this.textShow(this.iskanbanShow.isBack ? visibilityText.show0 : visibilityText.hidden5);
                        this.textHidden();
                    }
                    // this.iskanbanShow.runState = false;
                    this.iskanbanShow.isBack = true;
                    break;
                }
            }
        },
        operatingMenuShow(ev) {
          const menu = this.$refs.operatingMenu
          const textEl = this.$refs.kanbanText
          this.isOperatingMenu = true;
          menu.style.top = parseInt(textEl.style.top) - 170 + "px"
          menu.style.left = parseInt(textEl.style.left) - 20 + "px"
        },
        closeOperatingMenu() {
            this.isOperatingMenu = false;
        },
        changeKanBanImg() {
            // this.kanban
            if (this.kanban === "images/lian2.png") {
                this.kanban = "images/lian3.png"
            } else {
                this.kanban = "images/lian2.png"
            }
        }
    },
    mounted() {
        const self = this;
        // 监听图片显隐
        document.addEventListener("visibilitychange", this.kanbanVisibility);
        let kanbanShow = new IntersectionObserver(this.kanbanShow, {
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });
        kanbanShow.observe(this.$refs.kanbanArea);
        // 拖拽图片
        document.addEventListener("dragover", function (event) {
            event.preventDefault();
        }, false);
        document.addEventListener("drop", function (event) {
            let file = event.dataTransfer.files[0], reader = new FileReader();
            if (file?.type.includes("image")) {
                reader.readAsDataURL(file);
                reader.onload = function () {
                    self.bg = this.result;
                    self.$refs.bg.style.backgroundImage = "url('" + this.result + "')";
                    localStorage.setItem("bg", this.result);
                };
            }
            event.preventDefault();
        });
        if (localStorage.getItem("bg")) {
            this.bg = localStorage.getItem("bg");
        }

        this.$refs.kanbanArea.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            // console.log(event);
        });
    },
    components: { OperatingMenu }
}
</script>

<style scoped>
.kanbanArea {
  position: fixed;
  opacity: 0;
}
.kanbanimg {
  width: 150px;
  aspect-ratio: 3 / 4;
  cursor: inherit;
}
.kanbanText {
  position: absolute;
  padding: .5em;
  font-size: 12px;
  cursor: inherit;
}
.normalText {
  max-width: 150px;
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
