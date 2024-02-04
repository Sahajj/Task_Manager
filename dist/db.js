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
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
// Connecting to Db and Creating the main table
exports.client = new pg_1.Client({
    connectionString: "postgresql://postgres:blackjack@localhost:5432/postgres?sslmode=disable"
});
// Creating a Async function that creates a table
function CreateTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.client.connect();
        const status = yield exports.client.query(`
    CREATE TYPE task_status AS ENUM ('Pending', 'Working', 'Done');
    `);
        const result = yield exports.client.query(`
        CREATE TABLE tasks (
            taskId SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(225),
            DueDate DATE NOT NULL,
            status task_status NOT NULL
        );
    `);
        console.log(status);
        console.log(result);
    });
}
CreateTable();
// Create a function to Insert data to the table
