const { Sequelize } = require('sequelize');

const conexion = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
 
module.exports = conexion;