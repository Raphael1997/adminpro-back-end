const Medico = require('../models/medicos.models');
const Hospital = require("../models/hopitales.models");

/**
 *  Función para obtener medicos
 * @param  req -> request
 * @param  res -> response
 */
const getMedicos = async (req, res) => {

    const medico = await Medico.find()
        .populate("usuario", "nombre")
        .populate("hospital", "nombre")

    res.json({
        ok: true,
        medico
    })
}

/**
 *  Función para crear medicos
 * @param  req -> request
 * @param  res -> response
 */
const crearMedicos = async (req, res) => {

    const idUsuario = req.id;

    const idHospital = req.body.hospital;

    try {
        const hospitalDB = await Hospital.findById(idHospital);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital no existe"
            })
        }


        const medico = new Medico({
            ...req.body,
            usuario: idUsuario,
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

/**
 *  Función para actualizar  medicos
 * @param  req -> request
 * @param  res -> response
 */
const actualizarMedicos = async (req, res) => {

    const idMedico = req.params.id;
    const idUsuario = req.id;
    const { hospital } = req.body;

    try {

        const [medicoDB, hospitalDB] = await Promise.all([
            Medico.findById(idMedico),
            Hospital.findById(hospital)
        ]);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "El medico no existe"
            })
        }

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital no existe"
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: idUsuario,
            hospital: hospitalDB,
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back - Hable con el ADM"
        })
    }
}

/**
 *  Función para borrar medicos
 * @param  req -> request
 * @param  res -> response
 */
const borrarMedicos = async (req, res) => {

    const id = req.params.id;

    try {

        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: "El medico no existe"
            })
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Medico borrado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back - Hable con el ADM"
        })
    }
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}