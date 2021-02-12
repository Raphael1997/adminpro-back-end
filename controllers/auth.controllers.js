const Usuario = require("../models/usuarios.models");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

//TODO: no da pista al usuario de que campo falta email o password
const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email incorrecto"
            })
        }

        // validar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta"
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

const loginGoogle = async (req, res) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        // verificar si existe el usuario
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: "@@@",
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // guarudar en la bases de datos
        await usuario.save();

        // generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: "Token incorrecto"
        })
    }
}

const renovarToken = async (req, res) => {

    const id = req.id;

    // generar token
    const token = await generarJWT(id);

    //obtener usuario por ID
    const usuario = await Usuario.findById(id);

    res.json({
        ok: true,
        token,
        usuario
    })
}

module.exports = {
    login,
    loginGoogle,
    renovarToken
}