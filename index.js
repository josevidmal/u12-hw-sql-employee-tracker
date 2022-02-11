// require('dotenv').config();
// const mysql = require("mysql2");
require("console.table");
const inquirer = require("inquirer");
const figlet = require("figlet");
const Query = require("./db/query");

/* const connection = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    },
    console.log('Connected to the hr_db database.')
); */

const todoQuestion = () => {
    inquirer
        .prompt(
            {
                type: "list",
                message: "What would you like to do?",
                name: "to_do",
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
            },
        )

        .then((answers) => {
            if (answers.to_do === "View All Departments") {
                viewAllDepartments();
            }
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name",
            },
            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name",
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "employee_role",
                choices: [""],
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "employee_manager",
                choices: [""],
            },
        ])

        .then((answers) => {
            todoQuestion();
        });
};

const updateEmpRole = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "update_employee",
                choices: [""],
            },
            {
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                name: "update_role",
                choices: [""],
            },
        ])

        .then((answers) => {
            todoQuestion();
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the role?",
                name: "role_name",
            },
            {
                type: "input",
                message: "What is the salary of the role?",
                name: "role_salary",
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "role_department",
                choices: [""],
            },
        ])

        .then((answers) => {
            todoQuestion();
        });
};

const addDepartment = () => {
    inquirer
        .prompt(
            {
                type: "input",
                message: "What is the name of the department?",
                name: "department_name",
            }
        )

        .then((answers) => {
            todoQuestion();
        });
};

const systemLogo = () => {
    figlet.text(" \nMy HR \nSystem \n ", {
        font: "Larry 3D",
        horizontalLayout: "fitted",
        verticalLayout: "full"
    }, (err, data) => {
        if (err) {
            console.log("An error ocurred");
            console.dir(err);
            return;
        } else {
            console.log(data)
            todoQuestion();
        }
    }
    )
};

function init() {
    systemLogo()

    /* setTimeout(() => {
        todoQuestion();
    }, 1000) */
};

init();


function viewAllDepartments () {
    Query.viewAllDepartments().then((data) => {
        console.table(data[0]);
        todoQuestion();
    })
}