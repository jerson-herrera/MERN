// app..js Crea e exporta una instancia de una aplicación.
import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

export const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use(morgan("dev")); //Nos muestra un mensaje corto por consola de nuestras peticiones http
app.use(express.json()); //Middleware para que convierta los req.body en formato JSON.
app.use(cookieParser()) // Middleware para que cada vez que haya una cookie poder convertirla en un JSON.
app.use("/api",authRoutes);
app.use("/api",taskRoutes);
