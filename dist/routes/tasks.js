"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const db_1 = require("../db");
exports.TaskRouter = express_1.default.Router();
const StatusZod = zod_1.default.enum(["Pending", "Working", "Done"]);
const PostSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    DueDate: zod_1.default.coerce.date(),
    status: StatusZod,
});
exports.TaskRouter.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = 'SELECT * FROM tasks';
    const result = yield db_1.client.query(text);
    const data = result.rows;
    if (result === null) {
        res.status(200).json({
            message: "Yay No tasks"
        });
    }
    else if (!result) {
        res.status(400).json({
            message: "Can't connect to Db"
        });
    }
    else {
        res.status(200).json({
            message: data
        });
    }
}));
exports.TaskRouter.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskTitle = req.body.title;
    const TaskDesc = req.body.description;
    const DueDate = req.body.DueDate;
    const status = req.body.status;
    const { success } = PostSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        });
    }
    else {
        const text = 'INSERT INTO tasks(title, description, DueDate, status) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [TaskTitle, TaskDesc, DueDate, status];
        const result = yield db_1.client.query(text, values);
        res.status(200).json({
            message: result
        });
    }
}));
//zod schema for :id 
const idSchema = zod_1.default.object({
    id: zod_1.default.number().min(1)
});
//Get by ID of task /tasks/:id
exports.TaskRouter.get("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { success } = idSchema.safeParse({ id: +id });
    if (!success) {
        res.status(411).json({
            message: "Invalid ID"
        });
    }
    else {
        try {
            const text = 'SELECT * FROM tasks WHERE  taskId = $1';
            const value = [+id];
            const result = yield db_1.client.query(text, value);
            if (result.rows.length === 0) {
                res.status(404).json({
                    message: "Task not Found"
                });
            }
            else {
                res.status(200).json({
                    message: result.rows
                });
            }
        }
        catch (error) {
            console.error("Database Error:", error);
            res.status(500).json({
                message: "Internal Sever Error"
            });
        }
    }
}));
// zOd Put schema
const PutSchema = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    DueDate: zod_1.default.coerce.date().optional(),
    status: StatusZod.optional(),
});
// Put / Update task details /tasks/:id  
exports.TaskRouter.put("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { success } = idSchema.safeParse({ id: +id });
    if (!success) {
        return res.status(411).json({
            message: "Invalid ID"
        });
    }
    else {
        const { success } = PutSchema.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Invalid Update"
            });
        }
        else {
            const TaskTitle = req.body.title;
            const TaskDesc = req.body.description;
            const DueDate = req.body.DueDate;
            const status = req.body.status;
            try {
                const text = `
                UPDATE tasks SET 
                    title = COALESCE($2, title),
                    description = COALESCE($3, description),
                    DueDate = COALESCE($4, DueDate),
                    status = COALESCE($5, status)
                WHERE
                    taskId = $1
                `;
                const values = [+id, TaskTitle, TaskDesc, DueDate, status];
                const result = yield db_1.client.query(text, values);
                if (result.rowCount === 0) {
                    return res.status(404).json({
                        message: "Task not Found "
                    });
                }
                else {
                    return res.status(200).json({
                        message: "Task Updated"
                    });
                }
            }
            catch (error) {
                console.error("Database  Error:", error);
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }
        }
    }
}));
// Delete a task /tasks/:id
exports.TaskRouter.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { success } = idSchema.safeParse({ id: +id });
    if (!success) {
        res.status(411).json({
            message: "Invalid ID. Please enter a number."
        });
    }
    else {
        try {
            const text = 'SELECT * FROM tasks WHERE taskId = $1';
            const value = [+id];
            const result = yield db_1.client.query(text, value);
            if (result.rows.length === 0) {
                res.status(404).json({
                    message: "No task found with the provided ID."
                });
            }
            else {
                const deleteText = 'DELETE FROM tasks WHERE  taskId = $1';
                const deleteResult = yield db_1.client.query(deleteText, value);
                res.status(200).json({
                    message: "Task Deleted"
                });
            }
        }
        catch (error) {
            console.error("Database Error:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}));
