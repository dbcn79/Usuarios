const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async ( req, res = response ) => {

    const usuario = await Usuario.findAll({
        where: {
            estado: true
        }
    });

    res.json( usuario );    
}

const getUsuario = async ( req, res= response ) => {

    const { idParam } = req.params;

    console.log(idParam);

    const usuario = await Usuario.findOne({
        where: {
            nombre: idParam
        }
    });

    if ( !usuario ) {
        return res.status(400).json( {msg: `El usuario ${idParam} no existe`} );
    }    

    res.json( usuario );    

}

const postUsuario = async ( req, res = response ) => {

    const { body } = req;

    try {

        const newUsuario = await Usuario.create( body );   
        res.json(newUsuario);    
            
    } catch (error) {
        
        console.log(error);
        res.status(500).json( {msg: 'Hable con el administrador'} );
        
    }
}

const putUsuario = async ( req, res = response ) => {

    const { idParam } = req.params;
    const { body } = req;

    const usuario = await Usuario.findOne({
        where: {
            nombre: idParam
        }
    });    

    if ( !usuario ) {
        return res.status(400).json( {msg: `El usuario ${idParam} no existe`} );
    };    

    usuario.set( body );
    await usuario.save();

    res.json( usuario );

}

const deleteUsuario = async ( req, res = response ) => {

    const { idParam } = req.params;

    const usuario = await Usuario.findOne({
        where: {
            nombre: idParam
        }
    });    
    
    if ( !usuario ) {
        return res.status(400).json( {msg: `El usuario ${idParam} no existe`} );
    };    

    usuario.destroy();

    res.json( usuario );
    
}

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}