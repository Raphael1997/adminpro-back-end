const express = require("express");
require("dotenv").config(); // leer las variables de entornos
const { dbConnection } = require("./database/config")

// crear el servidor
const app = express();

// configurar CORS 
app.use(cors());

// bases de datos
dbConnection();

app.get("/", (req, res)=>{
    res.status(200).json({
        ok: true,
        msg: "Hola desde el servidor"
    })
})

app.listen(process.env.PORT, () =>{
    console.log("Servidor corriendo en el puerto: ", process.env.PORT);
})