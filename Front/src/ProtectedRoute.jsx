import React from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import {} from "./context/AuthContext"

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <h1>Loading.....</h1>;
  if (!loading && !isAuthenticated) return <Navigate to="/login" replace />; //Si el usuario no esta autenticado lo manda a login
  return <Outlet />; //Continua con el componente que esta adentro
};
