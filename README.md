# Project : Task Manager API

## Description
- Creating a Siple task Manager Api that allows users to manage their tasks. The Api support basic CRUD(Create, Read, Update, Delete) operations for tasks and use PostgreSQL or SQL database for the data Storage.

## Features 
1. Task Model
    - TaskID (Auto Increment)
    - Title 
    - Description
    - Due date
    - Status( Pending, working, done)
2. API Endpoints 
    - Create a new Task
    - get a list of all task
    - Get details of a specific task
    - Update task details
    - Delete a task
3. DataBase Integration
    - Using TypeScript with Node.js backend
    - Connecting to a Postgresql database to sore task and Description
4. Validation 
    - Implementing input validation and updating tasks.
    - Ensure that required fields are provided, and data are valid.
5. Error Handling
    - Implementing proper error handling and returning appropriate HTTP status codes.
    - Provide meaningful error message in API response
6. Testing
    - Write basic unit tests for your API endpoints using a testing library like jest

## Technologies 
- TypeScript
- Node.js 
- Express.js 
- PostgreSql