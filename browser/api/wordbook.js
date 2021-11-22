import $axios from 'axios';

async function wordAddMsg(params) {
    return await $axios.post('/api/wordbook/addmsg', {
        keyword: params.addKeyText,
        replyword: params.addReplyText,
        adder: params.adder || null
    });
}

async function wordQueryMsg(params) {
    return await $axios.get('/api/wordbook/querymsg', {
        params: {
            keyword: params
        }
    });
}

async function wordAllMsg() {
    return await $axios.get('/api/wordbook/allmsg');
}

async function wordSignIn(params) {
    return await $axios.post('/api/wordbook/signin', {
        user: params
    });
}

async function wordGetDuel() {
    return await $axios.get('/api/wordbook/getduel');
}

export {
    wordAddMsg,
    wordQueryMsg,
    wordAllMsg,
    wordSignIn,
    wordGetDuel
}