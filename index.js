const { prompt } = require('inquirer');
require('console.table');
const logo = require('asciiart-logo');
// const config = require('./package.json');
// const dbConnection = require('./db/connection.js');
const db = require('./db');

// const dbQueries = require('./db/index.js');


//Main menu----------------------------------------------------------------
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

//SQL DB queries ----------------------------------------------------

const viewEmployees = () => {
    db.query(`
    SELECT
    e.id AS ID,
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    r.title AS 'Current Role',
    d.dept_name AS Department,
    r.salary AS Salary,
    CONCAT(m.first_name,' ',m.last_name) AS Manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON m.id = e.manager_id
    ORDER BY e.id;
    `,
        (err, results) => {
            if (err) {
                throw err
            }
            console.log('----------- All Employees ----------');
            console.table(results);
            console.log('press up or down to continue');
        });
};

const addDepartment = (department) => {
    db.query(`INSERT INTO department (dept_name) VALUE (?)`, department,
        (err) => {
            if (err) {
                throw err
            }
            console.log('Department added successfully!');
            viewDepartments();
            console.log('press up or down to continue');
        });
};

const addEmployee = (employee) => {
    const employeeInsertion = [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`, employeeInsertion,
        (err) => {
            if (err) {
                throw err
            }
            console.log('Employee added successfully!');
            viewEmployees();
            console.log('press up or down to continue');
        });
};

const addRole = (role) => {
    db.query(`
 INSERT INTO role (title, salary, department_id)
 VALUE (?, ?, ?)
    `, role,
        (err) => {
            if (err) {
                throw err
            }
            console.log('Role added successfully!');
            viewRoles();
            console.log('press up or down to continue');
        });
};

const viewDepartments = () => {
    db.query(`
    SELECT
    d.id AS 'Department ID',
    d.dept_name AS 'Department Name'
    FROM department
    `,
        (err, results) => {
            if (err) {
                throw err
            }
            console.log('----------- All Departments ----------');
            console.table(results);
            console.log('press up or down to continue');
        });
};

const viewRoles = (selection) => {
    console.log(selection);
    db.query(`
    SELECT
    r.id AS 'Role ID',
    r.title AS 'Title',
    r.salary AS 'Salary',
    r.department_id AS 'Department Code'
    FROM role
    `,
        (err, results) => {
            if (err) {
                throw err
            }
            console.log('----------- All Roles ----------');
            console.table(results);
            console.log('press up or down to continue');
        });
};

const updateEmployeeRole = () => {
    db.query(`
   
    `,
        (err) => {
            if (err) {
                throw err
            }
            console.log('Employees role has been updated!');
            console.log('press up or down to continue');
        });
};

//Start question flow --------------------------------------------------------------------

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


const startQuestions = async () => {
    const selection = await prompt(mainActionMenu);

    selectionTriage(selection);
};


const selectionTriage = async selection => {
    if (selection === "View All Employees") {
        viewEmployees();
    } else if (selection === "Add Employee") {
        const newEmployee = await prompt(addEmployee);
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
                choices: [""], //list of roles directly from db
                default: "Head of Product"
            },
            {
                type: "list",
                name: "employeeManager",
                message: "Who is the employee's manager?",
                choices: [""]//list of active managers in db
            }
        ]

    } else if (selection === "Update Employee Role") {
        //call db for all employees select concat first and last name of employee
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
    } else if (selection === "View All Roles") {
        viewRoles();
    } else if (selection === "Add Role") {
        const newRole = await prompt(addRole);
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
                name: "role",
                message: "Which department does the role belong to?",
                choices: [""], //list of departments from db
                default: "Product"
            }
        ];
    } else if (selection === "View All Departments") {
        viewDepartments();

    } else if (selection === "Add Departments") {
        const newDepartment = await prompt(addDepartment);

        const addDepartment = [
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the department?"
            }
        ];
        addDepartment(department);
        startQuestions();

    } else if (selection === "Quit") {
        startQuestions();
    };
};





function init() {
    loadImage();
    startQuestions();
};

init();
