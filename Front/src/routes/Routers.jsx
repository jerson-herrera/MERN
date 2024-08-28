import { BrowserRouter, Route, Routes } from "react-router-dom";//BrowserRouter es el contenedor
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TaskPage } from "../pages/TaskPage";


export const Routers = () =>{
    return(
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/task" element={<TaskPage/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="" element={<Route/>}/>
            <Route path="/*" element={<Route/>}/>

        </Routes>
    )
}