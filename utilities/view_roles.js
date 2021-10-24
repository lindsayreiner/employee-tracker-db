const db = dbConnection();

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