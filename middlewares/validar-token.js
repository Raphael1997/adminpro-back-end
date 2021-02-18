const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios.models")
const validarJWT = (req, res, next) => {

    // leer el token
    const token = req.header("x-token");

    try {

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: "No hay token en la petición"
            })
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token incorrecto"
        })
    }
}

const validarADMIN_ROLE = async (req, res, next) => {

    const id = req.id;
    try {
        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }

        if (usuarioDB.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                ok: false,
                msg: "No tienes privilegios para hacer eso"
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

const validarADMIN_ROLE_o_Mismo_Usuario = async (req, res, next) => {

    const id = req.id;
    const idUser = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }

        if (usuarioDB.role !== "ADMIN_ROLE" && id !== idUser) {
            return res.status(403).json({
                ok: false,
                msg: "No tienes privilegios para hacer eso"
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_Mismo_Usuario
}