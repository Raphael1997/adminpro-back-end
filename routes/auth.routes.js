/* 
    Route: /api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controllers");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/",
    [
        check("email", "Introduce un email valido").isEmail(),
        check("password", "La contraseña es obligatoria").notEmpty(),
        validarCampos
    ],
    login
);



module.exports = router;