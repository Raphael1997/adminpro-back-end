const Usuario = require('../models/usuarios.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuario = async (req, res) => {

    const usuario = await Usuario.find({}, "nombre email role google");
    res.status(200).json({
        ok: true,
        usuario,
        id: req.id
    })
}

const crearUsuario = async (req, res) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya esta registrado"
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

        // generar token
        const token = await generarJWT(usuario.id);

        // guardar usuario
        await usuario.save();
        res.status(200).json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back"
        })
    }
}

const actualizarUsuario = async (req, res) => {

    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            })
        }

        // actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== req.body.email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "El email ya esta registrado"
                })
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back"
        })
    }
}

const borrarUsuario = async (req, res) => {

    const id = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(id);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "El usuario no existe"
            })
        }

        await Usuario.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Usuario borrado"
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back"
        })
    }
}


module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}