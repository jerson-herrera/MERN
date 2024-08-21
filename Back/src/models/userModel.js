//Un MODEL es una forma de especificarle a mongodb que es lo que vamos a estar guardando.En pocas palabras crea una estructura fija como una tabla pero para mongodb.
import mongoose from "mongoose";

//Un schema define la estructura y las reglas para los datos en una base de datos. 
const userSchema = new mongoose.Schema({
    //Esto es para decirle que es lo que voy a guardar
    username: {
        type:String,
        required:true,
        trim: true, //Limpia los espacios EJ:'   mochila  '  ==> 'mochila'
        unique: true,
    },
    email: {
        type:String,
        required:true,
        trim: true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    }
},{
    timestamps: true //Guarda la fecha en cuando se creo y se actualizo por ultima vez.
})


//Es para interactuar con la BD con los metodos
export default mongoose.model('User', userSchema);
