import express from  "express";
import { TaskRouter }  from "./tasks";

export const rootRouter = express.Router();

rootRouter.use("/", TaskRouter);

