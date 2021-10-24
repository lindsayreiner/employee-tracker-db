const db = dbConnection();

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