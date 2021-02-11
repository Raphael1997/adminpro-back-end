const Usuario = require('../models/usuarios.models');
const fs = require('fs');

const Medico = require('../models/medicos.models');
const Hospital = require('../models/hopitales.models');


/**
 * Función para borrar una imagen según la ruta
 * @param  path -> ruta de la imagen
 */
const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

/**
 *  Función para actualizar la foto según el tipo usuario
 * @param  tipo -> carpeta donde se va a guardar la imagen
 * @param  id -> ID del usuario
 * @param   nombreArchivo -> Nombre del archivo
 */
const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }

            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case "hospitales":

            const hospital = await Hospital.findById(id);

            if (!hospital) {
                return false;
            }

            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case "usuarios":
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }

}



module.exports = {
    actualizarImagen
}