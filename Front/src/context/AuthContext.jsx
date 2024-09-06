import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("El use auth deberia de estan dentro de un provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //Estado
  const [isAuthenticated, setIsAuthenticaded] = useState(false); //
  const [errores, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticaded(true);
    } catch (error) {
      // console.log(error.response)
      setErrors(error.response.data);
    }
  };
  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticaded(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  //Contador para eliminar los mensajes de error despues de un tiempo, en este casoo cada 5 segundos va a eliminar los mensajes de errores
  useEffect(() => {
    if (errores.length > 0) {
      //Si errores por lo menos tiene 1 error
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errores]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get(); //De cookies quiero obtener TODOS sus valores

      //Si no hay un token
      if (!cookies.token) {
        setIsAuthenticaded(false);
        setLoading(false)
        return setUser(null);
      }

      //Si hay un token,verificarlo porque el token tambien puede establecerse manualmente desde el navegador
      try {
        const res = await verifyTokenRequest(cookies.token);//Lo envia al backend
        console.log(res);
        if (!res.data) { //Si no responde ningun dato 
          setIsAuthenticaded(false);
          setLoading(false);
          return
        }
        //Si respondio datos es porque el usuario esta.
        setIsAuthenticaded(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) { //Si da un error y ejecuta el catch
        setIsAuthenticaded(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        singin,
        loading,
        user,
        isAuthenticated,
        errores,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
