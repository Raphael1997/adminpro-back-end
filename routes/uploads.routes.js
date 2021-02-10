/* 
    Rutas: api/upload
*/
const { Router } = require("express");
const { cargarArchivo } = require("../controllers/uploads.controllers");
const { validarJWT } = require("../middlewares/validar-token");
const subirArchivo = require("express-fileupload")

const router = Router();

router.use(subirArchivo());

router.put("/:tipo/:id", validarJWT, cargarArchivo);

module.exports = router;