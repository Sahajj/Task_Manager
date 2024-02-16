# Project: Task Manager API

## Description
- Creating a Siple task Manager Api that allows users to manage their tasks. The API supports basic CRUD(Create, Read, Update, Delete) operations for tasks and uses PostgreSQL or SQL database for Data Storage.

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
    - Connecting to a Postgresql database to store tasks and Description
4. Validation 
    - Implementing input validation and updating tasks.
    - Ensure that required fields are provided, and data are valid.
5. Error Handling
    - Implementing proper error handling and returning appropriate HTTP status codes.
    - Provide meaningful error messages in the API response
6. Testing
    - Write basic unit tests for your API endpoints using a testing library like Jest

## Technologies 
- TypeScript
- Node.js 
- Express.js 
- PostgreSQL

## API Endpoints:

- Implement the following RESTful API endpoints:
    1. POST /api/v1/tasks --> Create a new task.
    2. GET /api/v1/tasks --> Get a list of all tasks.
    3. GET /api/v1/tasks/:id --> Get details of a specific task.
    4. PUT /api/v1/tasks/:id --> Update task details.
    5. DELETE /api/v1/tasks/:id --> Delete a task.


## To run the DB locally 
```
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

```

### To connect and check DB
- Make sure you have psql installed or you can run 
```
npm install psql
```
- After you have psql locally you can start the psql Command Line Interface using the command below.
- Here **-h** is the hostname of the machine where the PostgreSQL server is running on a specific host.
- **-l** This is used to list all the DB on the PostgreSQL server that you have access to.
- **-U** This is used for the username that you want to connect as and the password should be the set password in the Env Variable.
```
psql -h localhost -l postgres -U postgres
```
- After this, it will ask you for the password that is in our case. 
```
mysecretpassword
```  
