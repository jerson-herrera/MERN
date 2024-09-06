import axios from "axios";

//

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
//withCredentials: true: Permite que las solicitudes incluyan cookies, credenciales HTTP u otros datos de autenticación cuando se hagan a dominios cruzados, siempre y cuando el servidor lo permita. Esto es necesario, por ejemplo, cuando tu aplicación necesita enviar cookies de autenticación al hacer peticiones a un servidor.
export default instance;
