let Table = {},
    DateTime = require('../datetime'),
    Random = require('../random');

Table.games = require('../db/game');


async function GamesQueryList(req, res) {
    try {
        let data = await Table.games.game.findAll({
            attributes: ['id', 'name', ['steam_appid', 'uid'], 'init_price', 'final_price', 'stop_sell',
                'team_id', 'team', 'publishers', 'is_free', 'release_date', 'first_time']
        });

        res.send(data);
    } catch(err) {
        res.send('error');
    }
}

async function GamesAddGame(req, res) {
    res.header("Content-Type", "application/json; charset=utf-8");
    try {
        if (req.body.uid) {
            const data = await Table.games.game.findOne({
                attributes: ['id'],
                where: {
                    steam_appid: req.body.uid
                }
            });
            if (data) {
                res.send(req.body.robot ? '游戏已经记录了喵~' : 'being');
                return;
            }
        }
        
        Table.games.game.create({
            name: req.body.name,
            steam_appid: req.body.uid,
            team: req.body.team || null,
            publishers: req.body.publishers || null,
            is_free: req.body.is_free ? 1 : 0,
            init_price: req.body.init_price || null,
            final_price: req.body.final_price || null,
            coming_soon: req.body.coming_soon ? 1 : 0,
            release_date: DateTime.cnToDate(req.body.release_date) || null
        });
        res.send(req.body.robot ? '添加成功了喵~' : 'success');
    } catch(error) {
        console.log(error);
        res.send('error');
    }
}

module.exports = {
    GamesQueryList,
    GamesAddGame
}