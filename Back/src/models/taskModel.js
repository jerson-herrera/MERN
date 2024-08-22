import mongoose from "mongoose";

const taksSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    dateToFinish:{
        type:Date,
        default:Date.now,
    },
    user:{  //este es el user Id al que pertenece
        type:mongoose.Schema.Types.ObjectId, //El id en mongodb es no es un tipo String,es tipo objectId un tipo de dato especial en mongodb
        ref:"User", //Esta referenciando a otro modelo en este caso el model USER
        require:true

    }
},{
    timestamps:true
})


// El modelo Task se comportará según las propiedades y métodos definidos en taskSchema. Cuando crees una instancia de Task o realices operaciones en la colección asociada, el modelo utilizará el esquema taskSchema para validar y estructurar los datos.
export default mongoose.model('Task', taksSchema);

