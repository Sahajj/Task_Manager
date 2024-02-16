import express from "express";
import zod from "zod";
import { client } from "../db"
export const TaskRouter = express.Router();

const StatusZod = zod.enum(["Pending", "Working", "Done"]);
const PostSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    DueDate: zod.coerce.date(),
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

//zod schema for :id 

const idSchema = zod.object({
    id: zod.number().min(1)
});

//Get by ID of task /tasks/:id
TaskRouter.get("/tasks/:id", async (req, res) => {
    const { id }= req.params;
    const { success } = idSchema.safeParse({id: +id});
    if(!success){
        res.status(411).json({
            message: "Invalid ID"
        })
    } else {
        try {
            const text = 'SELECT * FROM tasks WHERE  taskId = $1'
            const value = [+id]
            const result = await client.query(text, value)   

            if(result.rows.length === 0) {
                res.status(404).json({
                    message: "Task not Found"
                });
            } else {
                res.status(200).json({
                    message: result.rows
                }
                    );
            }
        }  catch (error) {
            console.error("Database Error:", error);
            res.status(500).json({
                message: "Internal Sever Error"
            });
        } 
   
    }
});

// zOd Put schema
const PutSchema = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    DueDate: zod.coerce.date().optional(),
    status: StatusZod.optional(),
})



// Put / Update task details /tasks/:id  
TaskRouter.put("/tasks/:id", async (req, res) => {
    const { id }= req.params;
    const { success } = idSchema.safeParse({id: +id});
    if(!success){
        return res.status(411).json({
            message: "Invalid ID"
        })
    } else {
        const { success }  = PutSchema.safeParse(req.body)
        if(!success) {
            return res.status(411).json({
                message: "Invalid Update"
            })
        } else {
            const TaskTitle: String = req.body.title;
            const TaskDesc: String = req.body.description;
            const DueDate: Number = req.body.DueDate;
            const status: String = req.body.status;
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
                const values = [+id, TaskTitle, TaskDesc, DueDate, status]
                const result = await client.query(text, values);

                if(result.rowCount === 0) {
                    return res.status(404).json({
                        message: "Task not Found "
                    });
                } else {
                    return res.status(200).json({
                        message: "Task Updated"
                    });
                }
            } catch (error) {
                console.error("Database  Error:", error);
                return res.status(500).json({
                    message: "Internal Server Error"
                });
            }
        }

    }
})

// Delete a task /tasks/:id
TaskRouter.delete("/tasks/:id", async (req, res) => {
    const { id }= req.params;
    const { success } = idSchema.safeParse({id: +id});
    if(!success){
        res.status(411).json({
            message: "Invalid ID. Please enter a number."
        });
    } else {
        try {
            const text = 'SELECT * FROM tasks WHERE taskId = $1';
            const value = [+id];
            const result = await client.query(text, value);

            if (result.rows.length === 0) {
                res.status(404).json({
                    message: "No task found with the provided ID."
                });
            } else {
                const deleteText = 'DELETE FROM tasks WHERE  taskId = $1';
                const deleteResult = await client.query(deleteText, value);   

                res.status(200).json({
                    message: "Task Deleted"
                });
            }
        } catch (error) {
            console.error("Database Error:", error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
});
