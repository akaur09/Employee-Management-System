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
            addDepartment();
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
        console.table(result);
        menu();
    });
}

// create function to display roles
function viewRoles() {
    let sql = `SELECT rol.id, rol.title, depart.name AS department, rol.salary 
    FROM roles AS rol
    JOIN departments AS depart
    ON rol.department_id = depart.id
    ORDER by rol.id`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.table(result);
        menu();
    });
}
// create function to  display employees
function viewEmployees() {
    let sql = `
    SELECT employees.id, employees.first_name, employees.last_name, title, name AS department, salary,
    CONCAT(employ.fisrt_name, " ", epmloy.last_name) AS manager
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees employ
    ON employees.manager = employ.id
    ORDER BY employees.id`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        console.table(result);
        menu();
    });
}
// create a function to add a department
function addDepartment(){
    // use inquirer prompt to ask if user wants to add department
    inquirer.prompt([
        {
            name: "departName",
            message: "Please enter the name of the new department",
            type: "input",
        },
    ])
    .then((answer) => {
        let sql =`INSERT INTO departments (name)
        VALUES ('${answer.departName}');`;
        db.query(sql, (error, result) => {
            if (error) throw error;
            console.log (`\n DEPARTMENT ${answer.departName} made successfully \n`);
            menu();
        });
    });
}