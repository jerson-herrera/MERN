//Los middlewars son funciones que se ejecutan antes de que lleguen a una ruta.

import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

/* authRequired,Se utiliza para proteger rutas y asegurarse de que solo los usuarios autenticados puedan acceder a ellas. */
export const authRequired = (req, res, next) => {
    //next se llama para pasar el control al siguiente middleware en la cadena.
    const { token } = req.cookies; //Extrae el token de las cookies enviadas por el cliente.

    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });

    /*jwt.verify toma tres argumentos:
    El token que se debe verificar. 
    La clave secreta (TOKEN_SECRET) con la que el token fue firmado.
    Un callback que se ejecutará una vez que se haya verificado el token, el cual recibe dos parámetros: err (para manejar posibles errores) y user (los datos decodificados del token si es válido). */
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        /*req.user = user;
        Si el token es válido, los datos del usuario que estaban codificados en el token se almacenan en req.user. Esto permite que las rutas posteriores tengan acceso a los datos del usuario autenticado. */
        req.user = user;
        next();
    });
};
