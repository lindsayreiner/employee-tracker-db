const { prompt } = require('inquirer');
const consoleTable = require('console.table');
const logo = require('asciiart-logo');
const config = require('./package.json');
const dbConnection = require('./db/connection.js');
const db = dbConnection();

const viewEmployees = require('./utilities/view_employees');
const viewRoles = require('./utilities/view_roles');
const viewDepartments = require('./utilities/view_departments');

const changeRole = require('./utilities/update_employee');
const addNewDepartment = require('./utilities/add_department');
const addNewEmployee = require('./utilities/add_employee');
const addNewRole = require('./utilities/add_role');


const mainActionMenu = [
    {
        type: "list",
        name: "selectAction",
        message:
            "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
        default: "View All Employees"
    }
];

const addDepartment = [
    {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?"
    }
];

const addRole = [
    {
        type: "input",
        name: "roleName",
        message: "What is the name of the role?"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "What is the salary for this role?"
    },
    {
        type: "list",
        name: "roleDepartment",
        message: "Which department does the role belong to?",
        choices: ["Product", "Engineering", "Operations", "Finance", "Legal", "Human Relations", "C-Suite"],
        default: "Product"
    }
];

const addEmployee = [
    {
        type: "input",
        name: "employeeFirstName",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name?"
    },
    {
        type: "list",
        name: "employeeRole",
        message: "What is the employee's role?",
        choices: ["Head of Product", "Product Manager", "UI/UX Designer", "Software Engineer", "Lead Engineer", "Ops Manager", "Business Analyst", "Team Leader", "Customer Svc Rep", "Accountant", "Head of Finance", "Legal Director", "Lawyer", "HR Manager", "HR Generalist", "CEO", "CFO", "COO"],
        default: "Head of Product"
    },
    {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager?",
        choices: [""]//list of active managers in db
    }
];



const loadImage = () => {
    console.log(
        logo({
            name: 'Employee Manager',
            font: 'Soft',
            lineChars: 8,
            padding: 2,
            margin: 3,
            borderColor: 'grey',
            logoColor: 'bold-blue',
            textColor: 'blue',
        })
            .emptyLine()
            .right('version 3.7.123')
            .render()
    );
};


const startQuestions = async input => {
    const selection = await prompt(mainActionMenu);

    selectionTriage(selection);
};


const selectionTriage = async selection => {
    if (selection === "View All Employees") {

    };

    if (selection === "Add Employee") {
        const newEmployee = await prompt(addEmployee);
    };

    //call db for all employees select concat first and last name of employee
    if (selection === "Update Employee Role") {
        const employees = await db.execute("select * from employee_db")
        console.log(employees);
        //const roles =
        const updateEmployeeRole = [
            {
                input: "list",
                name: "updateRoleEmployeeName",
                message: "Which employee's role do you want to update?",
                choices: employees //list of active employees in db
            },
            {
                input: "list",
                name: "",
                message: "Which role do you want to assign to the selected employee?",
                choices: roles

            }
        ];
        const updateRole = await prompt(updateEmployeeRole);
    };

    if (selection === "View All Roles") {
        // console.table('All Role Types', [])
    };

    if (selection === "Add Role") {
        const newRole = await prompt(addRole);
    };

    if (selection === "View All Departments") {

    };

    if (selection === "Add Departments") {
        const newDepartment = await prompt(addDepartment);
    };

    if (selection === "Quit") {

    };
}





function init() {
    loadImage();
    startQuestions();
};

init();
