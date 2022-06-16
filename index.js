// call on inquirer
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
]