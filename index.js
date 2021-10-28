const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db/connection');
require('console.table');

//Main menu----------------------------------------------------------------
const mainActionMenu = [
    {
        type: "list",
        name: "selectAction",
        message:
            "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Remove Department", "Remove Role", "Remove Employee", "Quit"],
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
            console.log('');
            console.table(results);
            console.log('press up or down to continue');
        });
};

const addDepartment = (department) => {
    db.query(`INSERT INTO department (dept_name) VALUE (?)`, [department.departmentName],
        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Department added successfully!');
            viewDepartments();
            console.log('press up or down to continue');
        });
};

const addNewEmployee = (employee) => {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)`, [employee.firstName, employee.lastName, employee.role, employee.manager],

        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Employee added successfully!');
            viewEmployees();
            console.log('press up or down to continue');
        });
};

const addRole = (role) => {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [role.title, role.salary, role.department_id],
        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Role added successfully!');
            viewRoles();
            console.log('press up or down to continue');
        });
};

const viewDepartments = () => {
    db.query(`
    SELECT
    d.id AS 'Dept ID',
    d.dept_name AS 'Dept Name'
    FROM department d
    `,
        (err, results) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.table(results);
            console.log('press up or down to continue');
        });
};

const viewRoles = () => {
    db.query(`
    SELECT
    r.id AS 'Role ID',
    r.title AS 'Title',
    r.salary AS 'Salary',
    r.department_id AS 'Department Code'
    FROM role r
    `,
        (err, results) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.table(results);
            console.log('press up or down to continue');
        });
};

const updateEmployeeRole = (role) => {
    db.query(`UPDATE employee e SET e.role_id = (?) where e.id = (?)`, [role.roleList, role.employeeList],
        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Employees role has been updated!');
            viewEmployees();
            console.log('press up or down to continue');
        });
};

const deleteDepartment = (department) => {
    db.query('DELETE FROM department d WHERE d.id = (?)', [department.del_dep_id],
        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Department deleted successfully!');
            viewDepartments();
            console.log('press up or down to continue');
        });
};

const deleteRole = (role) => {
    db.query('DELETE FROM role r WHERE r.id = (?)', [role.del_role_id],
        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Role deleted successfully!');
            viewRoles();
            console.log('press up or down to continue');
        });
};

const deleteEmployee = (employee) => {
    db.query('DELETE FROM employee e WHERE e.id = (?)', [employee.del_emp_id],
        (err) => {
            if (err) {
                throw err
            }
            console.log('');
            console.log('');
            console.log('Employee deleted successfully!');
            viewEmployees();
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
    const { selectAction } = await prompt(mainActionMenu);

    selectionTriage(selectAction);
};


const selectionTriage = async selection => {
    switch (selection) {
        case "View All Employees":
            viewEmployees();
            startQuestions();
            break;
        case "Add Employee":
            const roles = await db.query('select * from role');
            const employeeRoles = roles.map(({ title, id }) => ({ name: title, value: id }));


            const employees = await db.query('select * from employee');
            const employeeList = employees.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));

            const addEmployee = [
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is the employee's role?",
                    choices: employeeRoles
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is the employee's manager?",
                    choices: employeeList
                }
            ]
            const newEmployee = await prompt(addEmployee);
            addNewEmployee(newEmployee);
            startQuestions();
            break;
        case "Update Employee Role":
            const [empQuery] = await db.promise().query
                ('select * from employee');
            const empList = empQuery.map(({ first_name, last_name, id }) => ({ name: `${first_name} ${last_name}`, value: id }));

            const [allRoles] = await db.promise().query('select * from role');
            const roleList = allRoles.map(role => ({ value: role.id, name: role.title }));

            const roleQuestions = [
                {
                    type: "list",
                    name: "employeeList",
                    message: "Which employee's role do you want to update?",
                    choices: empList
                },
                {
                    type: "list",
                    name: "roleList",
                    message: "Which role do you want to assign to the selected employee?",
                    choices: roleList

                }
            ];
            const updateRole = await
                prompt(roleQuestions);
            updateEmployeeRole(updateRole);
            startQuestions();

            break;
        case "View All Roles":
            viewRoles();
            startQuestions();
            break;
        case "Add Role":
            const departments = await db.query('select * from department');
            const depts = departments.map(dep => ({ value: dep.id, name: dep.dept_name }));

            const newRoleQuestions = [
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary for this role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: depts
                }
            ];
            const newRole = await prompt(newRoleQuestions);
            addRole(newRole);
            startQuestions();
            break;
        case "View All Departments":
            viewDepartments();
            startQuestions();
            break;
        case "Add Department":
            const addDeptQuestions = [
                {
                    type: "input",
                    name: "departmentName",
                    message: "What is the name of the department?"
                }
            ];
            const newDepartment = await prompt(addDeptQuestions);
            addDepartment(newDepartment);
            startQuestions();
            break;
        case "Remove Department":
            const deptList = await db.query('select * from department');
            const deleteDept = deptList.map(dept => ({ value: dept.id, name: dept.dept_name }));

            const deleteDeptQuestions = [
                {
                    type: "list",
                    name: "del_dep_id",
                    message: "Which department would you like to remove?",
                    choices: deleteDept
                }
            ];

            const deletedDept = await prompt(deleteDeptQuestions);
            deleteDepartment(deletedDept);
            startQuestions();
            break;
        case "Remove Role":
            const allRolesList = await db.query('select * from role');
            const mappedRoles = allRolesList.map(roleDel => ({ name: roleDel.title, value: roleDel.id }));

            const deleteRoleQuestions = [
                {
                    type: "list",
                    name: "del_role_id",
                    message: "Which department would you like to remove?",
                    choices: mappedRoles
                }
            ];

            const deletedRole = await prompt(deleteRoleQuestions);
            deleteRole(deletedRole);
            startQuestions();
            break;
        case "Remove Employee":
            const allEmployeeList = await db.query('select * from employee');
            const mappedEmployees = allEmployeeList.map(({ first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));

            const deleteEmpQuestions = [
                {
                    type: "list",
                    name: "del_emp_id",
                    message: "Which employee would you like to remove?",
                    choices: mappedEmployees
                }
            ];

            const deletedEmp = await prompt(deleteEmpQuestions);
            deleteEmployee(deletedEmp);
            startQuestions();
            break;
        default:
            startQuestions();
            break;
    };

};

function init() {
    loadImage();
    startQuestions();
};

init();