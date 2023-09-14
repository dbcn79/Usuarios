const { DataTypes } = require('sequelize'); 
const conexion = require('../database/connection');

const Usuario = conexion.define('Usuarios', {  
 
    nombre: 
    {     
        type: DataTypes.STRING,     
        allowNull: false,
    },  
    email: 
    {     
        type: DataTypes.STRING,     
        allowNull: false,     
        unique: true,   
    }, 
    estado: 
    {     
        type: DataTypes.BOOLEAN,     
    },  
    
 }); 

 module.exports = Usuario;