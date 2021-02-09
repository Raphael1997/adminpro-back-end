const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {

    // leer el token
    const token = req.header("x-token");

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: "No hay token en la petición"
        })
    }

    try {

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        req.id = id;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token incorrecto"
        })
    }
}

module.exports = {
    validarJWT
}