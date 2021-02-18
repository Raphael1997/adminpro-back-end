const express = require("express");
const cors = require('cors')
require("dotenv").config(); // leer las variables de entornos
const { dbConnection } = require("./database/config")

// crear el servidor
const app = express();

// configurar CORS 
app.use(cors());

// leer y parseo del body
app.use(express.json());

// bases de datos
dbConnection();

// directorio publico
app.use(express.static("public"));


// Rutas
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/hospitales", require("./routes/hospitales.routes"));
app.use("/api/medicos", require("./routes/medicos.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/todo", require("./routes/busquedas.routes"));
app.use("/api/upload", require("./routes/uploads.routes"));



app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto: ", process.env.PORT);
})