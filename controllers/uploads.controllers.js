const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar_imagen');

/**
 * Función para cargar una foto y asignar a un usuario
 * @param  req -> request
 * @param  res -> response 
 */
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

    // Actualizar base de datos
    const resultado = await actualizarImagen(tipo, id, nombreArchivo);
    if (resultado) {
        //mover la iamgen
        archivo.mv(ruta, async (error) => {
            if (error) {
                return res.status(500).json({
                    ok: false,
                    msg: "Error al mover la imagen"
                });
            }

            return res.json({
                ok: true,
                msg: "Archivo subido",
                nombreArchivo
            })
        })
    } else {
        return res.status(500).json({
            ok: false,
            msg: "ID incorrecto"
        })
    }

}

/**
 *  Función para obtener el archivo del usuario y guardar en el servidor.
 *  Si el usuario no tiene una foto, enviamos una por defecto
 * @param  req -> request
 * @param  res -> response
 */
const obtenerArchivo = async (req, res) => {

    const { tipo, foto } = req.params;

    const rutaImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(rutaImagen)) {
        res.sendFile(rutaImagen);
    } else {
        const rutaImagen = path.join(__dirname, `../uploads/noImage.png`);
        res.sendFile(rutaImagen);
    }
}


module.exports = {
    cargarArchivo,
    obtenerArchivo
}