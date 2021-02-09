const Usuario = require("../models/usuarios.models");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

//TODO: no da pista al usuario de que campo falta email o password
const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El email no existe - BORRAR"
            })
        }

        // validar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: "La contraseña no existe - BORRAR"
            })
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log("EROR");
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back"
        })
    }
}

module.exports = {
    login
}