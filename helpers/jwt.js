const jwt = require('jsonwebtoken');

const generarJWT = (id) => {

    return new Promise((resolve, reject) => {
        // en el payload no se pone informacion sensible
        const payload = {
            id
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "12h"
        }, (error, token) => {

            if (error) reject("Error al generar el JWT");
            else resolve(token);
        });
    })

}

module.exports = {
    generarJWT
}