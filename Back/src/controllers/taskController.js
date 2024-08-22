import Task from "../models/taskModel.js";
import mongoose from "mongoose";

export const getTasks = async (req, res) => {
    const tasksFound = await Task.find({
        user: req.user.id, //Trae todas las tareas, pero solo las del usuario que esta autenticado.
    });
    if (!tasksFound || tasksFound.length === 0)
        return res.status(400).json({ message: "tasks not found" });
    res.json({
        message: "Tareas encontradas:",
        tasks: tasksFound,
    });
};

export const getTaskById = async (req, res) => {
    const { id } = req.params;

    // Validar que el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const taskFound = await Task.findById(id).populate("user");
        if (!taskFound)
            return res.status(404).json({ message: "tasks not found by id" });
        res.status(200).json(taskFound);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la tarea" });
    }
};

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id, // El valor req.user.id viene del middleware authRequired, el cual guarda el user en  req.user, y req.user adentro tiene el id.
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
};
export const updateTask = async (req, res) => {
    const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!taskFound)
        return res.status(404).json({ message: "Task not found by update" });
    res.json(taskFound);
};
export const deleteTask = async (req, res) => {
    const taskFound = await Task.findByIdAndDelete(req.params.id);
    if (!taskFound)
        return res.status(404).json({ message: "tasks not found by DELETE" });
    return res.sendStatus(204).json({ message: "Tarea borrada correctamente" });
};
