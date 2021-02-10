/* 
    Rutas: api/todo
*/
const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-token");
const { getBusquedaTotal, getBusquedaColeccion } = require('../controllers/busquedas.controllers');

const router = Router();


router.get("/:busqueda", validarJWT, getBusquedaTotal);

router.get("/:coleccion/:tabla/:busqueda", validarJWT, getBusquedaColeccion);

module.exports = router;