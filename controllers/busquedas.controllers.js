const Usuario = require("../models/usuarios.models");
const Medico = require("../models/medicos.models");
const Hospital = require("../models/hopitales.models");

const getBusquedaTotal = async (req, res) => {

    const palabra = req.params.busqueda;
    const regex = new RegExp(palabra, "i");

    const [usuario, medico, hospital] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
    ]);


    res.json({
        ok: true,
        usuario,
        medico,
        hospital
    });
}

const getBusquedaColeccion = async (req, res) => {

    const tabla = req.params.tabla;
    const palabra = req.params.busqueda;
    const regex = new RegExp(palabra, "i");

    let data = [];

    switch (tabla) {

        case "medicos":
            data = await Medico.find({ nombre: regex })
                                    .populate("usuario", "nombre img")
                                    .populate("hospital", "nombre img")
            break;
        case "hospitales":
            data = await Hospital.find({ nombre: regex })
                                    .populate("usuario", "nombre img")
            break;
        case "usuarios":
            data = await Usuario.find({ nombre: regex })
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: "La tabla tienes que ser usuarios/medicos/hospitales"
            })
    }

    res.json({
        ok: true,
        resultado: data
    })
}

module.exports = {
    getBusquedaTotal,
    getBusquedaColeccion
}