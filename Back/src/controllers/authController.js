import User from "../models/userModel.js";
import bcrypt from "bcryptjs"; //se usa para encriptar (hashear) las contraseñas antes de guardarlas en la BD
import { createAccesToken } from "../libs/jwt.js";
//Controller de register
export const register = async (req, res) => {
    const { email, password, username } = req.body; //Accede al cuerpo de la solicitud

    try {
        const passwordHash = await bcrypt.hash(password, 10); //El 10 representa el número de rondas de salting.
        const newUser = new User({
            //Se crea una nueva instancia del model User
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save(); // Guarda el nuevo documento User en la base de datos.con un ID generado por MongoDB.
        const token = await createAccesToken({ id: userSaved._id });
        res.cookie("token", token); //Se establece una cookie en la respuesta con el nombre "token" y el valor del token generado.
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
        console.log("usuario creado");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect password" });

        const token = await createAccesToken({ id: userFound._id });
        res.cookie("token", token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
};
