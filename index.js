// require('dotenv').config();
// const mysql = require("mysql2");
require("console.table");
const inquirer = require("inquirer");
const figlet = require("figlet");
const Query = require("./db/query");
const { prompts } = require("inquirer");
const { escape } = require("./src/connection");

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
            } if (answers.to_do === "View All Roles") {
                viewAllRoles();
            } if (answers.to_do === "View All Employees") {
                viewAllEmployees();
            } if (answers.to_do === "Add Department") {
                addDepartment();
            } if (answers.to_do === "Add Role") {
                addRole();
            } if (answers.to_do === "Add Employee") {
                addEmployee();
            } if (answers.to_do === "Update Employee Role") {
                updateEmpRole();
            } if (answers.to_do === "Quit") {
                process.exit()
            };
        });
};

const addEmployee = () => {
    Query.selectTitle().then((data) => {
        const titleChoices = data[0].map(a => a.title);

    Query.selectManager().then((data) => {
        const managerChoices = data[0].map(a => a.manager);

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
                choices: titleChoices,
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "employee_manager",
                choices: managerChoices,
            },
        ])

       .then((answers) => {
            newEmployee(answers.first_name, answers.last_name, answers.employee_role, answers.employee_manager);
        });
    });
    });  
};

const updateEmpRole = () => {
    Query.selectEmployee().then((data) => {
        const employeeChoices = data[0].map(a => a.employee);

    Query.selectTitle().then((data) => {
        const titleChoices = data[0].map(a => a.title);

    inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee's role do you want to update?",
                name: "update_employee",
                choices: employeeChoices,
            },
            {
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                name: "update_role",
                choices: titleChoices,
            },
        ])

        .then((answers) => {
            updateEmployeeRole(answers.update_role, answers.update_employee)
        });
    });
    });
};

const addRole = () => {
    Query.selectDepartment().then((data) => {
        const departmentChoices = data[0].map(a => a.name);
    
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
                choices: departmentChoices,
            },
        ])

        .then((answers) => {
            newRole(answers.role_name, answers.role_salary, answers.role_department);
        });
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
            newDepartment(answers.department_name);
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

const init = () => {
    systemLogo();
};

init();


const viewAllDepartments = () => {
    Query.viewAllDepartments().then((data) => {
        console.table(data[0]);
        todoQuestion();
    });
};

const viewAllRoles = () => {
    Query.viewAllRoles().then((data) => {
        console.table(data[0]);
        todoQuestion();
    });
};

const viewAllEmployees = () => {
    Query.viewAllEmployees().then((data) => {
        console.table(data[0]);
        todoQuestion();
    });
};

const newDepartment = (department) => {
    Query.newDepartment(department).then(() => {
        console.log(`Added ${department} to the database`);
        todoQuestion();
    });
};

const newRole = (title, salary, department) => {
    Query.newRole(title, salary, department).then(() => {
        console.log(`Added ${title} to the database`);
        todoQuestion();
    });
};

const newEmployee = (first_name, last_name, role_id, manager_id) => {
    Query.newEmployee(first_name, last_name, role_id, manager_id).then(() => {
        console.log(`Added ${first_name} ${last_name} to the database`);
    });
};

const updateEmployeeRole = (role_id, first_name, last_name) => {
    Query.updateEmployeeRole(role_id, first_name, last_name).then(() => {
        console.log(`Updated employee's role`);
    });
};