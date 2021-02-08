// getting-started.js
// OG72LIh4BrlIWIse password
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

        console.log("BD online");
    } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar la base de datos")
    }
}

module.exports = {
    dbConnection
}