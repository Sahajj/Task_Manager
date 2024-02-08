import { Client } from "pg";

// Connecting to Db and Creating the main table
export const client = new Client({
    connectionString: "postgresql://postgres:blackjack@localhost:5432/postgres?sslmode=disable"   
})

// Creating a Async function that creates a table
async function CreateTable() {
    await client.connect();
    const status = await client.query(`
    CREATE TYPE task_status AS ENUM ('Pending', 'Working', 'Done');
    `)

    const result = await client.query(`
        CREATE TABLE tasks (
            taskId SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            description VARCHAR(225),
            DueDate DATE NOT NULL,
            status task_status NOT NULL
        );
    `)
    console.log(status);
    console.log(result);
}

CreateTable();

