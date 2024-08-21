import Task from "../models/taskModel.js";
export const getTasks= async(req, res) => {
    const tasksFound = await Task.find()
    if (!tasksFound || tasksFound.length === 0) return res.status(400).json({message: "tasks not found"})
    res.json({
        message: "Tareas encontradas:",
        tasks: tasksFound
    });
}
export const getTaskById= async(req, res) => {}
export const createTask= async(req, res) => {
    const {title,description,date} = req.body;

    const newTask = new Task({
        title,
        description,
        date
    })
    const taskSaved = await newTask.save()
    res.json(taskSaved)


}
export const updateTask= async(req, res) => {}
export const deleteTask= async(req, res) => {}