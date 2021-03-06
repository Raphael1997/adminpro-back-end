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
        console.log(error);
        throw new Error(error)
    }
}

module.exports = {
    dbConnection
}
