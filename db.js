const {Sequelize} = require('sequelize');

const conf = {
    username: 'root',
    password: null,
    database: 'database_dev',
    host: '127.0.0.1',
    dialect: 'postgres'
    }

module.exports = new Sequelize(
    conf

    // 'telega_bot',
    // 'root',
    // {
    //     host: '',
    //     port: '',
    //     dialect: 'postgres',
    // }
)

