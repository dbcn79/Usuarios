//const  router = require('express');
const express = require('express');
const { getUsuarios, 
        getUsuario, 
        postUsuario,
        putUsuario, 
        deleteUsuario } = require('../controllers/usuario');

const router = express.Router();

router.get('/', getUsuarios);
router.get('/:idParam', getUsuario);
router.post('/', postUsuario);
router.put('/:idParam',  putUsuario);
router.delete('/:idParam', deleteUsuario);

module.exports = router;
