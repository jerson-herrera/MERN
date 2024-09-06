import React from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { ProfilePage } from "./pages/ProfilePage";
import { HomePage } from "./pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*Rutas publicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/*Rutas privadas */}
          <Route element={<ProtectedRoute/>}> {/*Enc */}
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/add-task" element={<TaskFormPage />} />
            <Route path="/task/:id" element={<TaskFormPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
