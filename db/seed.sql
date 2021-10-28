INSERT INTO department (dept_name)
VALUES ('Product'),
       ('Engineering'),
       ('Operations'),
       ('C-Suite');


INSERT INTO role (title, salary, department_id) 
VALUES ('Head of Product', 150000.00, 1),
       ('Product Manager', 120000.00, 1),
       ('UI/UX Designer', 90000.00, 1),
       ('Lead Engineer', 150000.00, 2),
       ('Software Engineer', 130000.00, 2),
       ('Ops Manager', 120000.00, 3),
       ('Business Analyst', 90000.00, 3),
       ('CEO', 1500000.00, 7);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Mark', 'Cuban', 16),
       ('Lori', 'Greiner', 17),
       ('Daymond', 'John', 18),
       ('Kim', 'Kardashian West', 1),
       ('Kanye', 'West', 5),
       ('Khloe', 'Kardashian', 6),
       ('Kylie', 'Jenner', 11),
       ('Kris', 'Jenner', 12);