const Hospital = require('../models/hopitales.models');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getHospitales = async (req, res) => {

    const hospital = await Hospital.find()
        .populate("usuario", "nombre")

    res.json({
        ok: true,
        hospital
    })
}

const crearHospitales = async (req, res) => {

    const idUsuario = req.id;

    const hospital = new Hospital({
        usuario: idUsuario,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        return res.json(500).json({
            ok: false,
            msg: "Error no controlado por el back"
        })
    }

}

const actualizarHospitales = async (req, res) => {


    res.json({
        ok: true,

    })
}

const borrarHospitales = async (req, res) => {

    res.json({
        ok: true,
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}