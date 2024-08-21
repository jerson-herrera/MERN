import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const createAccesToken = (payload) => {
    //Se esta creando una promesa que, cuando se cumple, devuelve el token generado, y si falla, devuelve un error.
    return new Promise((resolve, reject) => { 
        jwt.sign( //Esta función se utiliza para crear un nuevo JWT.
            payload, //Primer argumento,es un objeto que contiene la información que deseas incluir dentro del JWT.
            TOKEN_SECRET, //Segundo argumento,Esta clave se utiliza para firmar el token
            {
                expiresIn: "1d", //Tercer argumento es un objeto de opciones. En este caso el token tendrá una validez de 1 día
            },
            (err, token) => {// Cuarto argumento es una función de callback que se ejecuta cuando la firma del token ha sido completada. 
                if (err) reject(err);
                resolve(token);
            }
        );
    });
};
