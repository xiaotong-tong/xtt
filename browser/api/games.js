import $axios from 'axios';

async function gamesQueryList() {
    return await $axios.get('/api/games/querylist');
}

async function gamesAddGame(params) {
    return await $axios.post('/api/games/addgame', params);
}

async function getUidGameInfo(uid) {
    return await $axios.get("/appdetails/?appids=" + uid);
}

export {
    gamesQueryList,
    gamesAddGame,
    getUidGameInfo
}