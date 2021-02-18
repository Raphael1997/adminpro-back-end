/* 
    Ruta: /api/usuarios
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require("../controllers/usuarios.controllers");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_Mismo_Usuario } = require("../middlewares/validar-token");

const router = Router();

router.get("/", validarJWT, getUsuario);

router.post("/",
    [
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("password", "La contraseña es obligatoria").notEmpty(),
        check("email", "Introduce un email valido").isEmail(),
        validarCampos

    ],
    crearUsuario
);

router.put("/:id",
    [
        validarJWT,
        validarADMIN_ROLE_o_Mismo_Usuario,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("email", "Introduce un email valido").isEmail(),
        check("role", "El role es obligatoria").notEmpty(),
        validarCampos
    ],
    actualizarUsuario);

router.delete("/:id",
    [
        validarJWT,
        validarADMIN_ROLE
    ],
    borrarUsuario
);


module.exports = router;