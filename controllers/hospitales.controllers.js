const Hospital = require('../models/hopitales.models');

const getHospitales = async (req, res) => {

    const hospital = await Hospital.find()
        .populate("usuario", "nombre img")

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
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back - Hable con el ADM"
        })
    }

}

/**
 * 
 * @param  req 
 * @param  res 
 */
const actualizarHospitales = async (req, res) => {

    const id = req.params.id;
    const idUsuario = req.id;
    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: "El hospital no existe"
            })
        }

        /* hospitalDB.nombre = req.body.nombre; -> 1º forma */

        const cambiosHospital = {
            ...req.body,
            usuario: idUsuario
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });

        res.json({
            ok: true,
            hospital: hospitalActualizado

        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back - Hable con el ADM"
        })
    }


}

/**
 * 
 */
const borrarHospitales = async (req, res) => {
    const id = req.params.id;

    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: false,
                msg: "Hospital no encontrado"
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: "Hospital borrado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error no controlado por el back - Hable con el ADM"
        })
    }

}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}