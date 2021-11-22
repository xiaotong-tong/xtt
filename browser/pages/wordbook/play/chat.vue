<template>
  <div class="chat-warp">
      <section class="chat-show-area">
          <div
            class="chat-show-item"
            :class="{ 'chat-reply-re': message.replyText && !!message.replyText === !!showText[index - 1].replyText}"
            v-for="(message, index) in showText"
            :key="index">
              <div v-if="message.keyText" class="chat-key">
                  <div class="avatar-warp">
                      <img src="~/static/images/xiaobing.jpg" alt="头像">
                  </div>
                  <bdo class="chat-show-text" dir="ltr" v-html="message.keyText"></bdo>
              </div>
              <div v-else class="chat-reply">
                  <div class="avatar-warp">
                      <img src="~/static/images/banban.jpg" alt="头像">
                  </div>
                  <span class="chat-reply-banban">【板板】评测学校公示板</span>
                  <bdo class="chat-show-text" dir="ltr" v-html="message.replyText"></bdo>
              </div>
                
          </div>
      </section>
      <section class="chat-send-area">
          <div class="chat-send-tip">
              <svg class="icon-tip icon" viewBox="0 0 192 512">
                  <path d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z"></path>
              </svg>
          </div>
          <div class="chat-send-tip-dialog">
              <ul class="chat-send-tip-info">
                  <li class="chat-send-tip-info-item" @click="sendMsgText = ':/add'">
                      <span>添加指令</span>
                      <span>:/add</span>
                  </li>
                  <li class="chat-send-tip-info-item" @click="$router.push({path: '/wordbook/allword'})">
                      <span>查看关键字</span>
                      <span>:/showall</span>
                  </li>
              </ul>
          </div>
          <textarea v-model="sendMsgText" name="sendmsg" class="chat-send-input" @keyup.enter="sendMsg"></textarea>
          <input type="submit" id="send-msg-submit" class="not-show">
          <label for="send-msg-submit" class="send-msg-btn" @click="sendMsg">发送</label>
      </section>
  </div>
</template>

<script>
import { wordAddMsg, wordQueryMsg, wordSignIn, wordGetDuel } from '~~/api/wordbook.js';

export default {
    data() {
        return {
            sendMsgText: '',
            showText: [],
            sendMsgState: 0, // 为 1 时表示当前正在添加状态
            wordInfo: {
                addKeyText: '',
                addReplyText: ''
            }
        }
    },
    methods: {
        sendMsg() {
            let inputText = this.sendMsgText.replace(/\n*$/, ''),
                inputState = this.sendMsgState,
                inputMapIndex,
                inputMap = [':/add', "板板签到", "板板数字对决"],
                mapPair= ["addMsg", "signIn", "getDuel"],
                mapObj = {
                    addMsg: () => {
                        this.sendMsgState = 1;
                        this.showText.push({ replyText: '请输入触发语 喵~'});
                    },
                    signIn: () => {
                        console.log('111');
                        const { data } = wordSignIn('3059198472');
                        console.log(data);
                    },
                    getDuel: async ()=> {
                        const { data } = await wordGetDuel();
                        if(data === 'error') {
                            this.showText.push({ replyText: '小莫的信号怎么消失了?' });
                            return;
                        }
                        this.showText.push(data);
                    }
                };

            this.sendMsgText = '';
            if (inputText === '' || 
                (inputState === 1 && inputText === ':/add')) {
                return;
            }
            this.showText.push({ keyText: inputText });

            if (inputState === 1) {
                this.addMsg(inputText);
                return;
            }

            if ((inputMapIndex = inputMap.indexOf(inputText)) >= 0) {
                mapObj[mapPair[inputMapIndex]]();
                return;
            }

            this.queryMsg(inputText);
        },
        addMsg(inputText) {
            if (this.wordInfo.addKeyText === '') {
                this.wordInfo.addKeyText = inputText;
                this.showText.push({ replyText: '请输入回复语 喵~'});
                return;
            }

            this.wordInfo.addReplyText = inputText;
            const { data }= wordAddMsg(this.wordInfo);
            this.sendMsgState = 0;
            this.wordInfo.addKeyText = '';
            this.wordInfo.addReplyText = '';

            if(data === 'error') {
                this.showText.push({ replyText: '小莫怎么拿到了错误的服务器数据?' });
                return;
            }
            this.showText.push({ replyText: '添加成功了喵' });
        },
        async queryMsg(inputText) {
            const { data } = await wordQueryMsg(inputText);
            if(data === 'error') {
                this.showText.push({ replyText: '小莫的信号怎么消失了?' });
                return;
            }
            this.showText.push(data);
        }
    }
}
</script>

<style scoped>
.chat-warp {
    height: 100%;
}
.chat-show-area {
    height: 355px;
    border-bottom: 1px solid var(--border-color);
    overflow-y: auto;
}
.chat-send-area {
    position: relative;
    height: calc(100% - 355px);
}
.chat-send-input {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 35px);
    border: none;
    font-size: 26px;
    padding: 4px;
}
.chat-send-tip {
    height: 35px;
    width: 35px;
    aspect-ratio: 1 / 1;
}
.icon-tip {
    width: 19px;
    height: 19px;
    margin: 8px
}
.icon-tip path{
    fill: #878b99;
}
.icon-tip:hover {
    background-color: #f1f1f1;
    outline: 4px solid #f1f1f1;
}
.chat-send-tip:hover + .chat-send-tip-dialog {
    display: block;
}
.chat-send-tip-dialog {
    display: none;
    position: absolute;
    left: 0;
    bottom: 100%;
    box-shadow: 0 0 2px #666;
}
.chat-send-tip-dialog:hover {
    display: block;
}
.chat-send-tip-info {
    background-color: #ffffff66;
    font-size: 14px;
    padding: 3px;
}
.chat-send-tip-info-item {
    padding: 3px 1em;
}
.chat-send-tip-info-item:hover {
    background-color: #cbcbcb;
}
.chat-send-tip-info-item span:nth-child(1) {
    display: inline-block;
    min-width: 5em;
}

.chat-show-item {
    margin-top: 10px;
}
.chat-reply-re {
    margin-top: 20px;
}
.chat-key,
.chat-reply {
    font-size: 20px;
    display: flex;
}
.chat-key {
    flex-direction: row-reverse;
}
.chat-show-text {
    padding: 11px;
    border-radius: 9px;
}
.chat-key .chat-show-text {
    background-color: #12B7F5;
    color: #fff;
    margin-top: 15px;
    max-width: 700px;
}
.chat-reply .chat-show-text {
    min-width: 1em;
    background-color: #E5E5E5;
    transform: translate(-130px,20px);
    max-width: 700px;
}
.chat-key .chat-show-text::after,
.chat-reply .chat-show-text::after {
    content: '';
    position: absolute;
    top: 5px;
    height: 0;
    width: 0;
    border-width: 5px 10px;
    border-style: solid;
}
.chat-reply .chat-show-text::after {
    left: 0;
    border-color:#E5E5E5;
    border-left-color: transparent;
    border-top-color: transparent;
    transform-origin: left top;
    transform: rotate(45deg);
}
.chat-key .chat-show-text::after {
    right: 0;
    border-color:#12B7F5;
    border-right-color: transparent;
    border-top-color: transparent;
    transform-origin: right top;
    transform: rotate(-45deg);
}
.chat-reply .chat-reply-banban {
    color: #7f7f7f;
    font-size: 12px;
}
.avatar-warp {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 12px;
}
.avatar-warp img {
    width: 33px;
    height: 33px;
    aspect-ratio: 1 / 1;
}
.send-msg-btn {
    position: absolute;
    bottom: 14px;
    right: 14px;
    width: 60px;
    height:26px;
    line-height: 26px;
    background-color: #12B7F5;
    color: #fff;
    text-align: center;
    font-size: 14px;
}
.send-msg-btn:hover {
    background-color: #47C8F8;
}
</style>
