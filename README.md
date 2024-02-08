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

## To run the db locally 
```
docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres

```

### To connect and check DB
- Make sure you have psql installed or you can run 
```
npm install psql
```
- After you have psql locally you can start the psql cli using the command below.
- Here **-h** is the host name of the machine where the PostgreSQL server running on a specific host.
- **-l** This is used to list all the Db on the PostgreSQL server that you have access to.
- **-U** This is used for the username that you want to connect as and the password should be the set password in the Env Variable.
```
psql -h localhost -l postgres -U postgres
```
- After this it will ask you the password that will be in out case. 
```
mysecretpassword
```  