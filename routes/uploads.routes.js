/* 
    Rutas: api/upload
*/
const { Router } = require("express");
const { cargarArchivo, obtenerArchivo } = require("../controllers/uploads.controllers");
const { validarJWT } = require("../middlewares/validar-token");
const subirArchivo = require("express-fileupload")

const router = Router();

router.use(subirArchivo());

router.put("/:tipo/:id", validarJWT, cargarArchivo);
router.get("/:tipo/:foto", obtenerArchivo);

module.exports = router;