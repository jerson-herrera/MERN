import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/merndb");
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
};
/*
"mongodb://localhost/merndb" es la URI (Identificador Uniforme de Recursos) que especifica dónde está ubicada la base de datos y cómo conectarse a ella.
mongodb://: El protocolo que se usa para conectar a MongoDB.
localhost: Indica que la base de datos está corriendo en la máquina local, es decir, en tu computadora.
merndb: El nombre de la base de datos a la que te quieres conectar. Si no existe, MongoDB la creará automáticamente cuando se guarden datos.
Intenta conectarse a una base de datos MongoDB llamada merndb en tu máquina local.
 */
