/*
    Ruta: /api/medicos

*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos, getMedicosID } = require("../controllers/medicos.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-token");

const router = Router();


router.get("/", validarJWT, getMedicos);

router.post("/",
    [
        validarJWT,
        check("nombre", "Introduce el nombre del medico").notEmpty(),
        check("hospital", "El id del hospital debe de ser válido").isMongoId(),
        validarCampos
    ],
    crearMedicos
);

router.put("/:id",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("hospital", "Introduzca un ID valido de Mongo").isMongoId(),
        validarCampos
    ],
    actualizarMedicos
);

router.delete("/:id", validarJWT, borrarMedicos);

router.get("/:id", validarJWT, getMedicosID);



module.exports = router;