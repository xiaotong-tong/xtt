const { DataTypes, DATEONLY } = require('sequelize'),
    { game } = require('./db'),
    Table = {};

Table.game = game.define("games", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64)
    },
    steam_appid: {
        type: DataTypes.CHAR(8)
    },
    init_price: {
        type: DataTypes.SMALLINT(8)
    },
    final_price: {
        type: DataTypes.SMALLINT(8)
    },
    team_id: {
        type: DataTypes.BIGINT.UNSIGNED
    },
    team: {
        type: DataTypes.STRING(64)
    },
    publishers: {
        type: DataTypes.STRING(64)
    },
    stop_sell: {
        type: DataTypes.BOOLEAN
    },
    is_free: {
        type: DataTypes.BOOLEAN
    },
    coming_soon: {
        type: DataTypes.BOOLEAN
    },
    release_date: {
        type: DataTypes.DATEONLY
    },
    first_time: {
        type: DataTypes.DATEONLY
    }
}, {
    timestamps: false
});

Table.teams = game.define("teams", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    team_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    show_name: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    weibo: {
        type: DataTypes.STRING(64)
    },
    qqqun: {
        type: DataTypes.STRING(64)
    },
    bilibili: {
        type: DataTypes.STRING(64)
    },
    website: {
        type: DataTypes.STRING(64)
    }
}, {
    timestamps: false
});

Table.character = game.define("character", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(64)
    },
    game: {
        type: DataTypes.STRING(32)
    },
    for_game: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    cv: {
        type: DataTypes.STRING(32)
    },
    age: {
        type: DataTypes.SMALLINT(6)
    },
    height: {
        type: DataTypes.SMALLINT(6)
    },
    birthday: {
        type: DataTypes.CHAR(8)
    }
}, {
    timestamps: false
})

module.exports = Table;