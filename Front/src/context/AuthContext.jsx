import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth";

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
  const [errores, setErrors] = useState([])
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticaded(true);
    } catch (error) {
      // console.log(error.response)
      setErrors(error.response.data)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errores,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
