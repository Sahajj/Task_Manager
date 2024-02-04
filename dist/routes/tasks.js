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
const db_1 = require("../db");
exports.TaskRouter = express_1.default.Router();
exports.TaskRouter.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    db_1.client.connect();
    const text = '';
    const result = yield db_1.client.query(text);
    res.status(200).json({
        message: result
    });
}));
exports.TaskRouter.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const TaskTitle = req.body.title;
    const TaskDesc = req.body.description;
    const DueDate = req.body.DueDate;
    const status = req.body.status;
    db_1.client.connect();
    const text = 'INSERT INTO tasks(title, description, DueDate, status) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [TaskTitle, TaskDesc, DueDate, status];
    const result = yield db_1.client.query(text, values);
    res.status(200).json({
        message: result
    });
}));
