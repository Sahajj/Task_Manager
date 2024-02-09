import express from "express";
import zod from "zod";
import { client } from "../db"
export const TaskRouter = express.Router();

const StatusZod = zod.enum(["Pending", "Working", "Done"]);
const PostSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    DueDate: zod.date(),
    status: StatusZod,
})



TaskRouter.get("/tasks", async (req, res) => {
    const text = 'SELECT * FROM tasks'
    const result = await client.query(text)
    const data = result.rows;
    if (result === null) {
        res.status(200).json({
            message: "Yay No tasks"
        })
    } else if(!result){
        res.status(400).json({
            message: "Can't connect to Db"
        })
    } else {
        res.status(200).json({
            message: data
        })
    }
})



TaskRouter.post("/tasks", async (req, res) => {
    const TaskTitle: String = req.body.title;
    const TaskDesc: String = req.body.description;
    const DueDate: Number = req.body.DueDate;
    const status: String = req.body.status;
    const { success } = PostSchema.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            message: "Incorrect Inputs"
        })
    } else {
        const text = 'INSERT INTO tasks(title, description, DueDate, status) VALUES($1, $2, $3, $4) RETURNING *'
        const values = [TaskTitle,TaskDesc,DueDate,status]
        const result = await client.query(text, values)
        res.status(200).json({
            message: result
        })
    }
})