import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
} from "../controllers/taskController.js";

const router = Router();

router.get("/verTasks", authRequired, getTasks);
router.get("/verTask/:id", authRequired, getTaskById);
router.post("/createTask", authRequired, createTask);
router.put("/updateTask/:id", authRequired, updateTask);
router.delete("/deleteTask/:id", authRequired, deleteTask);

export default router;
