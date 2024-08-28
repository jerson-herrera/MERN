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
  const signup = async (user) => {
    const res = await registerRequest(user);
    console.log(res.data);
    setUser(res.data);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
