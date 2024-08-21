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
    }
},{
    timestamps:true
})


// El modelo Task se comportará según las propiedades y métodos definidos en taskSchema. Cuando crees una instancia de Task o realices operaciones en la colección asociada, el modelo utilizará el esquema taskSchema para validar y estructurar los datos.
export default mongoose.model('Task', taksSchema);

