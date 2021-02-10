const Medico = require('../models/medicos.models');

const getMedicos = async (req, res) => {

    const medico = await Medico.find()
        .populate("usuario", "nombre")
        .populate("hospital", "nombre")

    res.json({
        ok: true,
        medico
    })
}

const crearMedicos = async (req, res) => {

    const idUsuario = req.id;

    try {

        const medico = new Medico({
            usuario: idUsuario,
            ...req.body
        });
        await medico.save();

        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back"
        })
    }
}

const actualizarMedicos = async (req, res) => {

    res.json({
        ok: true,
        msg: "actualizar medicos"
    })
}

const borrarMedicos = async (req, res) => {

    res.json({
        ok: true,
        msg: "borrar medicos"
    })
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}