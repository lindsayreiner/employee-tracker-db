const db = require('./connection');
require('console.table');

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

const viewRoles = () => {
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

module.exports = { viewRoles, viewEmployees, viewDepartments, addRole, addDepartment, addEmployee, updateEmployeeRole }