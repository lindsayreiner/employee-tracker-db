const db = dbConnection();

const viewEmployees = () => {
    db.query(`
    SELECT
    e.id AS 'ID',
    e.first_name AS 'First Name',
    e.last_name AS 'Last Name',
    r.title AS 'Current Role',
    d.dept_name AS 'Department',
    r.salary AS 'Salary',
    // not sure how to do manager AS 'Manager'
    FROM employee
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee e.
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