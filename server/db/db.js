const { Sequelize } = require('sequelize');
const DB = {},
    dbInfo = {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        charset: process.env.DB_CHARSET,
        // timezone: '+08:00'
    };

DB.thai = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    dbInfo
);

DB.game = new Sequelize(
    process.env.DB_DBNAME1,
    process.env.DB_USER,
    process.env.DB_PWD,
    dbInfo
);

module.exports = DB;
