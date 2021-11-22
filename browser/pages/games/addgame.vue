<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="游戏名">
               <el-input
                    v-model.trim="addGameInfo.name"
                    placeholder="请输入游戏名"
                    clearable
                    @input="inputText"
                ></el-input>
            </el-form-item>
            <el-form-item label="uid">
               <el-input
                v-model.trim="addGameInfo.uid"
                placeholder="请输入游戏对应id"
                clearable
                @input="inputText"
                @blur="getUidGameInfo(addGameInfo.uid)"
                ></el-input>
                <el-tooltip effect="dark" content="输入appid时会自动填入一些信息" placement="top">
                    <i class="icon el-icon-info form_tip"></i>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="制作组">
               <el-input
                v-model.trim="addGameInfo.team"
                placeholder="请输入制作组名称"
                clearable
               ></el-input>
            </el-form-item>
             <el-form-item label="发行">
               <el-input
                v-model.trim="addGameInfo.publishers"
                placeholder="请输入发行商名称·"
                clearable
               ></el-input>
            </el-form-item>
            <div
                v-if="addGameInfo.coming_soon || addGameInfo.release_date"
                class="price-area"
            >
                <div class="price-label">
                    发售时间
                </div>
                 <div v-if="addGameInfo.coming_soon">
                    <span>即将发售</span>
                </div>
                <div v-else>
                    <span>{{ addGameInfo.release_date }}</span>
                </div>
            </div>
            <div
                v-else-if="addGameInfo.init_price || addGameInfo.is_free || addGameInfo.coming_soon"
                class="price-area"
            >
                <div class="price-label">
                    售价
                </div>
                <div v-if="addGameInfo.init_price === '0' || addGameInfo.is_free">
                    <span>免费</span>
                </div>
                <div v-else-if="addGameInfo.init_price = addGameInfo.final_price">
                    <span>{{ addGameInfo.init_price }}</span>
                </div>
                <div v-else>
                    <span>{{ addGameInfo.final_price }}</span>
                    <span class="sales">{{ addGameInfo.init_price }}</span>
                </div>
                
            </div>
            <el-form-item>
               <el-button type="primary" round @click="addGame" :disabled="btnstate">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

  <script>
import { gamesAddGame, getUidGameInfo } from '~~/api/games.js';

export default {
    data() {
        return {
            addGameInfo: {
                name: '',
                uid: '',
                team: '',
                publishers: ''
            },
            btnstate: true,
            gameInfoByUid: {}
        }
    },
    methods: {
        // 向 addgame 接口发起 post 请求
        async addGame() {
            const { data } = await gamesAddGame(this.addGameInfo);
            if(data === 'error') {
                this.$message.error('服务器好像出问题了nya');
                return;
            }
            if(data === 'being') {
                this.$message.error('该appid已经有了，快看看是不是写错了。');
                return;
            }
            this.$message.success('添加完成');
            this.addGameInfo = {
                name: '',
                uid: '',
                team: '',
                publishers: ''
            }
            this.btnstate = true;
        },
        // 当页面没有任何输入值时，将提交按钮设置为 disabled 状态
        inputText() {
            if (this.addGameInfo.name || this.addGameInfo.uid) {
                this.btnstate = false;
            } else {
                this.btnstate = true
            }
        },
        // 传入一个 steam 游戏的 appid，根据 appid 向 steam 接口发起 get 请求，获取游戏相关信息。
        async getUidGameInfo(uid) {
            if (!uid) {
                return;
            }
            let data = await getUidGameInfo(uid),
                price;
            this.gameInfoByUid = (data = data.data[uid].data);
            this.addGameInfo = {
                ...this.addGameInfo,
                name: data.name,
                team: data.developers.join(','),
                publishers: data.publishers.join(','),
                is_free: false,
                init_price: ((price = data.price_overview && data.price_overview.initial_formatted) && price.substring(2)) || '0',
                final_price: ((price = data.price_overview && data.price_overview.final_formatted) && price.substring(2)) || '0',
                coming_soon: data.release_date.coming_soon,
                release_date: data.release_date.coming_soon ? null : this.DateTime.toCnDate(data.release_date.date)
            }
        }
    },
    created() {
        // this.getUidGameInfo(1658840);
    },
    layout: 'site'
}
  </script>

  <style scoped>
  .el-form {
      margin-top: 1em;
  }
  .el-input {
      width: 30vw;
  }
  .el-input {
      min-width: 200px;
  }
  .form_tip {
      margin-left: 1em;
      width: 24px;
      height: 24px;
  }
  .sales {
    text-decoration: line-through;
  }
  .price-area {
    display: flex;
  }
  .price-label {
      width: 80px;
      text-align: right;
      color: #606266;
      font-size: 14px;
    vertical-align: middle;
      line-height: 40px;
      padding-right: 12px;
      box-sizing: border-box;
  }
    .price-area div:last-child {
        vertical-align: middle;
         line-height: 40px;
          color: #606266;
      font-size: 14px;
      padding: 0 14px;
      box-sizing: border-box;
    } 
  </style>