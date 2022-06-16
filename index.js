// call on inquirer
const e = require('express');
const inquirer = require('inquirer');
// require sql
const mysql = require("mysql");

const questions = [
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
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "Choose an option: ",
            choices: questions,
        },
    ])
        .then((data) => {
            if (data.option == questions[0]) {
                viewDepartment();
            } else if (data.option == questions[1]) {
                viewRoles();
            } else if (data.option == questions[2]) {
                viewEmployees();
            } else if (data.option == questions[3]) {
                addDepartment();
            } else if (data.option == questions[4]) {
                addRole();
            } else if (data.option == questions[5]) {
                addEmployee();
            } else if (data.option == questions[6]) {
                updateEmployee();
            } else if (data.option == questions[7]) {
                byeBye();
            } else {
                console.log(data);
                console.log(questions[0]);
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
function addDepartment() {
    // use inquirer prompt to ask if user wants to add department
    inquirer.prompt([
        {
            name: "departName",
            message: "Please enter the name of the new department",
            type: "input",
        },
    ])
        .then((answer) => {
            let sql = `INSERT INTO departments (name)
        VALUES ('${answer.departName}');`;
            db.query(sql, (error, result) => {
                if (error) throw error;
                console.log(`\n DEPARTMENT ${answer.departName} made successfully \n`);
                menu();
            });
        });
}
// create a function that adds a new role into roles table
function addRole() {
    // select a department
    let allDepartments = [];
    let sqlOne = `SELECT * FROM departments`;
    db.query(sqlOne, (error, result) => {
        if (error) throw error;

        let i = 0;
        while (result[i]) {
            allDepartments.push(result[i].name);
            i++;
        }
    });
    // create an inquirer prompt to add role
    inquirer.prompt([
        {
            name: "rolName",
            message: "Please enter the title for the new role",
            type: "input",
        },
        {
            name: "rolSalary",
            message: "Please enter the salary for this role",
            type: "input",
        },
        {
            name: "rolDepartment",
            message: "Please choose what department this role belongs to: ",
            type: "list",
            choices: allDepartments,
        },
    ])
        .then((answer) => {
            let depart_id = 0;
            for (let x = 0; x < allDepartments.length; x++) {
                if (answer.reportsTo == allDepartments[x]) {
                    depart_id = x + 1;
                }
            }
            // add function to insert into table
            let sql = `
        INSERT INTO roles (title, salary, department_id)
        VALUES ('${answer.rolName}', '${answer.rolSalary}', ${depart_id});
        `;
            db.query(sql, (error, result) => {
                if (error) throw error;
                console.log(`\n ROLE ${answer.rolName} created with a salary of ${answer.rolSalary} \n`);
                menu();
            });
        });
}
//  create function to add an employee 
function addEmployee() {
    // call on all roles helper function
    let allRoles = getRoles();
    // call on helper function to get all employees
    let allEmployees = getEmployees();
    // use inquirer prompt to add employee
    inquirer.prompt([
        {
            name: "firstName",
            message: "Please enter employees first name: ",
            type: "input",
        },
        {
            name: "lastName",
            message: "Please enter employees last name: ",
            type: "input",
        },
        {
            name: "assignRole",
            message: "Please select the employees role: ",
            type: "list",
            choices: allRoles,
        },
        {
            name: "reports",
            message: "Please choose who this employees works under: ",
            type: "list",
            choices: allEmployees,
        },
    ])
        .then((answer) => {
            let role_id = 0;
            for (let x = 0; x < allRoles.length; q++) {
                if (answer.assignRole == allRoles[x]) {
                    role_id = x + 1;
                }
            }
            let leader_id = 0;
            for (let x = 0; q < allRoles.length; q++) {
                if (answer.reports == allRoles[q]) {
                    leader_id = q + 1;
                }
            }

            let sql = `
        INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES ('${answer.first}', '${answer.last}', ${role_id}, ${leader_id});`;
            db.query(sql, (error, result) => {
                if (error) throw error;
                console.log(`\n employee ${answer.first} ${answer.last} added \n`);
                menu();
            });
        });
}

// create a function that updates employee information
function updateEmployeeRole() {
    //  call employee helper function
    let allEmployees = getEmployees();
    // call roles helper function
    let allRoles = getRoles();
    // user inquier to prompt user to update employee
    inquirer.prompt([
        {
            name: "confirm",
            message: "Are you sure you want to change an employee's role?",
            type: "confirm",
            choices: ["press enter"],
        },
        {
            name: "whichEmployee",
            message: "Please select the employee you wish to update?",
            type: "list",
            choices: allEmployees,
        },
        {
            name: "whichRole",
            message: "which role would you like to assign this employee: ",
            type: "list",
            choices: allRoles,
        },
    ])
    .then ((answer) => {
        let roleId = 0;
        for (let x = 0; x < allRoles.length; x++){
            if (answer.whichRole == allRoles[x]){
                roleId = x +1;
            }
        }
        let employeeId = 0;
        for (let p = 0; p <allEmployees.length; p++){
            if (answer.whichEmployee == allEmployees[p]) {
                employeeId = p + 1;
            }
        }
        // add sql function 
        let sql = `
        UPDATE employees
        SET role_id = ${roleId}
        WHERE id = ${employeeId};`;
        db.query (sql, (error, result) => {
            if (error) throw error;
            console.log (`\n ${answer.whichEmployee}'s role has been updated to ${answer.whichRole} \n`);
            menu();
        })
    })
}

