// Este archivo es el que arranca la aplicacion
import { app } from "./app.js";
import { connectDB } from "./db.js";

//IMPORTANTE ANTES DE EJECUTAR EL COMANDO NPM RUN BACK, ABRIR CMD Y EJECUTAR EL COMANDO mongod PARA INICIAR EL SERVIDOR MONGODB
connectDB(); //Esta linea de codigo arranca la BD

app.listen(3000);
console.log("Server on port", 3000);
