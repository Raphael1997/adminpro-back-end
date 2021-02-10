const { v4: uuidv4 } = require('uuid');
const Usuario = require("../models/usuarios.models");
const Medico = require("../models/medicos.models");
const Hospital = require("../models/hopitales.models");
const { actualizarImagen } = require('../helpers/actualizar_imagen');

const cargarArchivo = async (req, res) => {

    let rutaVieja = "";


    const { tipo, id, } = req.params;

    const tiposValidos = ["hospitales", "medicos", "usuarios"];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "Ruta invalida.",
            ruta: "Ejemplo de ruta valida: /api/upload/usuarios, medicos o usuarios/ARCHIVO"
        })
    }

    // validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No hay ningún archivo"
        })
    }

    // procesar la imagen
    const archivo = req.files.imagen;

    const nombreCortado = archivo.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // validar extension
    const extensionValida = ["png", "jpg", "jpeg", "gif"];

    if (!extensionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es una extensión valida",
            extensionesValida: extensionValida
        })
    }

    // generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path para guardar la iamgen
    const ruta = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la iamgen
    archivo.mv(ruta, (error) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                msg: "Error al mover la imagen"
            });
        }

        // Actualizar base de datos
        const resultado = await actualizarImagen(tipo, id, nombreArchivo);
        console.log(resultado);

        res.json({
            ok: true,
            msg: "Archivo subido"
        })
    })

}

const actualizarImagen = async (tipo, id) => {
    const [usuario, medico, hospital] = await Promise.all([
        Usuario.findById(id),
        Medico.findById(id),
        Hospital.findById(id)
    ]);

    console.log(medico);
}
const borrarImagen = async (ruta) => {

    if (fs.existsSync(ruta)) {
        // borrar la imagen anterior
        fs.unlinkSync(ruta);
    }
}


module.exports = {
    cargarArchivo
}