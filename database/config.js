// getting-started.js
const mongoose = require('mongoose');

/**
 * Conexion a la bases de datos
 */
const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });

        console.log("DB online");
    } catch (error) {
        throw new Error("Error al iniciar la base de datos")
    }
}

module.exports = {
    dbConnection
}
