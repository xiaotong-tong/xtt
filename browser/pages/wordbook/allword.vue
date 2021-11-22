<template>
  <div>
    <section>
        <table class="keyword-table">
            <thead>
                <th class="keyword-h keyword-index"></th>
                <th class="keyword-h keyword-key">关键字</th>
                <th class="keyword-h keyword-reply">回复语</th>
            </thead>
            <tbody>
                <tr class="keyword-item" v-for="(item, index) in showAllList" :key="item.id">
                    <td class="keyword-td keyword-index-td">{{ index + 1 }}</td>
                    <td class="keyword-td">{{ item.keyText }}</td>
                    <td class="keyword-td" v-if="/^images\/.*\.(jpg|png|webp|jpeg)$/.test(item.replyText)" >
                        <img
                        class="keyword-reply-img"
                        :src="host.oss + item.replyText"
                        :alt="item.replyText"
                        @dblclick="bigImgSrc = host.oss + item.replyText"
                        >
                    </td>
                    <td class="keyword-td" v-else>
                        {{ item.replyText }}
                    </td>
                </tr>
            </tbody>
        </table>
    </section>

    <section class="img-dialog" v-show="bigImgSrc">
        <img class="img-big" :src="bigImgSrc" :alt="bigImgSrc">
    </section>
    <div class="img-mask" @click="bigImgSrc = ''" v-show="bigImgSrc"></div>
  </div>
</template>

<script>
import { wordAllMsg } from '~~/api/wordbook.js';

export default {
    data() {
        return {
            showAllList: [],
            bigImgSrc: '',
            host: this.$host
        }
    },
    methods: {
        async getAllData() {
            const data = await wordAllMsg();
            this.showAllList = data.data;
        }
    },
    created() {
        this.getAllData();
    },
    layout: 'site'
}
</script>

<style scoped>
.keyword-table {
    margin: 3em;
}
.keyword-h,
.keyword-td {
    border: 1px solid #ccc;
}
.keyword-h + .keyword-h,
.keyword-td + .keyword-td {
    border-left: none;
}
.keyword-index {
    width: 2em;
}
.keyword-key {
    min-width: 10em;
    max-width: 20em;
}
.keyword-reply {
    width: 10em;
}

.keyword-index-td {
    text-align: center;
    vertical-align: middle;
}
.keyword-td {
    border-top: none;
}
.keyword-reply-img {
    max-width: 20em;
}

.img-dialog {
    position: fixed;
    top: 10vh;
    left: 10vw;
    width: auto;
    height: auto;
    max-height: 80vh;
    max-width: 80vw;
    overflow: hidden;
    z-index: 9;
}
.img-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ccc;
    opacity: 0.3;
    z-index: 8;
}
.img-big {
    height: 100%;
    width: 100%;
    object-fit: contain;
}
</style>
