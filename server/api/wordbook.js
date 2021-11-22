let Table = {},
    DateTime = require('../datetime'),
    Random = require('../random');

Table.thai = require('../db/thai');

function wordAddMsg(req, res) {
    try {
        Table.thai.wordbook.create({
            keyword: req.body.keyword,
            replyword: req.body.replyword,
            adder: req.body.adder || null
        });

        res.send('success');
    } catch (err) {
        res.send('error');
    }
}

async function wordQueryMsg(req, res) {
    try {
        let data = await Table.thai.wordbook.findAll({
            attributes: [['replyword', 'replyText']],
            where: {
                keyword: req.query.keyword
            }
        });

        if (data.length > 1) {
            data[0] = data[Random.getRandomNum(0, data.length - 1)];
        }

        if (req.query.robot) {
            res.send(data[0] ? data[0].replyText : '');
        } else {
            res.send(data[0]);
        }
    } catch (err) {
        res.send('error');
    }
}

async function wordAllMsg(req, res) {
    try {
        let data = await Table.thai.wordbook.findAll({
            attributes: ['id', ['keyword', 'keyText'], ['replyword', 'replyText']]
        });

        res.send(data);
    } catch(err) {
        res.send('error');
    }
}

function wordGetDuel(req, res) {
    let reply = {},
        player = Random.getNumDuel(1, 100, 5),
        environment = Random.getNumDuel(1, 100, 5);

    reply.replyText = `嗯？您要和板板数字对决嘛？\n
    唔...那来吧！板板先来：\n
    ${environment.join(', ')}\n
    ————————————————\n
    接下来，是您的回合：\n
    ${player.join(', ')}\n
    ————————————————\n
    板板得分：${environment.reduce((a, b) => a + b)}\n
    您的得分为：${player.reduce((a, b) => a + b)}\n
    呵呵，不出所料的失败了呢...`

    if (req.query.robot) {
        res.send(reply.replyText.replace(/\n/g, '【换行】'));
    } else {
        reply.replyText = reply.replyText.replace(/\n/g, '<br>');
        res.send(reply);
    }
}

module.exports = {
    wordAddMsg,
    wordQueryMsg,
    wordAllMsg,
    wordGetDuel
}