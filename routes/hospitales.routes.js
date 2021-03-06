/* 
    Ruta: /api/hospitales
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { getHospitales, crearHospitales, actualizarHospitales, borrarHospitales } = require("../controllers/hospitales.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-token");

const router = Router();

router.get("/", getHospitales);

router.post("/",
    [
        validarJWT,
        check("nombre", "El nombre del hospital es obligatorio").notEmpty(),
        validarCampos
    ],
    crearHospitales
);

router.put("/:id",
    [
        validarJWT,
        check("nombre", "El nombre del hospital es obligatorio").notEmpty(),
        validarCampos
    ],
    actualizarHospitales);

router.delete("/:id", borrarHospitales);



module.exports = router;