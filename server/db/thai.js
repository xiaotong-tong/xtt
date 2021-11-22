const { DataTypes, DATEONLY } = require('sequelize'),
    { thai } = require('./db'),
    Table = {};

Table.wordbook = thai.define("wordbook", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    keyword: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    replyword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adder: {
        type: DataTypes.STRING(16)
    },
    addtime: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
});

module.exports = Table;
