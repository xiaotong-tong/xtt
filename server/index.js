const app = require('express')();
// const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const https = require("https");
const fs = require("fs");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(cors())

const WordBook = require('./api/wordbook')
const Games = require('./api/games')
// const QQ = require('./initoobj');

// 添加回复语
app.post('/api/wordbook/addmsg', (req, res) => {
    WordBook.wordAddMsg(req, res);
})

// 根据关键字获取单条回复语
app.get('/api/wordbook/querymsg', (req, res) => {
    WordBook.wordQueryMsg(req, res);
})

// 获取全部关键字和回复语
app.get('/api/wordbook/allmsg', (req, res) => {
    WordBook.wordAllMsg(req, res);
})

// 板板签到
app.get('/api/wordbook/signin', (req, res) => {
    WordBook.wordSignIn(req, res);
})

// 游戏列表
app.get('/api/games/querylist', (req, res) => {
    Games.GamesQueryList(req, res);
})
// 添加游戏
app.post('/api/games/addgame', (req, res) => {
    Games.GamesAddGame(req, res);
})
// 板板数字对决
app.get('/api/wordbook/getduel', (req, res) => {
    WordBook.wordGetDuel(req, res);
})
app.listen(process.env.API_POST, function () {
    console.log('server in ' + process.env.API_HOST_LOCAL + ':' + process.env.API_POST)
});

const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, './ssl/6594827_xtt.moe.pem')),
    cert: fs.readFileSync(path.join(__dirname, './ssl/file.crt'))
}, app);
httpsServer.listen(7366, () => {
    console.log('7366')
});