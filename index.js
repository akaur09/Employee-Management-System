// call on inquirer
const e = require('express');
const inquirer = require('inquirer');
// require sql
const mysql = require("mysql");

const questions= [
    "VIEW ALL DEPARTMENTS",
    "VIEW ALL ROLES",
    "VIEW ALL EMPLOYEES",
    "ADD DEPARTMENT",
    "ADD ROLE",
    "ADD EMPLOYEE",
    "UPDATE ENPLOYEE",
    "DONE",
];

// empty array
var list = []; 

// create a sql connection
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Ak_9586!",
        database: "business",
        multipleStatements: true,
    }
);

// create a funciton to display the menu and make choices
function menu() {
    inquirer.prompt ([
        {
            name: "option",
            type: "list",
            message: "Choose an option: ",
            choices: questions,
        },
    ])
    .then ((data) => {
        if (data.option == questions[0]){
            viewDepartment();
        } else if (data.option == questions[1]){
            viewRoles();
        } else if (data.option == questions[2]){
            viewEmployees();
        } else if (data.option == questions[3]){
            viewDepartment();
        } else if (data.option == questions[4]){
            addRole();
        } else if (data.option == questions[5]){
            addEmployee();
        } else if (data.option == questions [6]){
            updateEmployee();
        } else if (data.option == questions[7]){
            byeBye();
        } else {
            console.log(data);
            console.log (questions[0]);
        }
    });
}

// create function to select which department to view
function viewDepartment() {
    let sql = `SELECT * FROM departments`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.log (result);
        menu();
    });
}