INSERT INTO departments (id, name)
VALUES (1, "Engineering"),
        (2, "Sales"),
        (3, "Customer Service"),
        (4, "Marketing"),
        (5, "Human Resources")

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Senior Dev", 130000, 1),
        (2, "Junior Dev", 70000, 1)
        (3, "Manager", 90000, 1),
        (4, "Outside Sales Rep", 80000, 2),
        (5, "Sales Manager", 100000, 2)
        (6, "Customer Service Rep", 45000, 3),
        (7, "Graphic Designer", 50000, 4),
        (8, "Digital Marketing Coordinator", 65000, 4),
        (9, "VP of Human Resources", 100000, 5)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Mason", "Wallis", 1, 3),
        (2, "Jacob", "Guiro", 2, 3),
        (3, "Leah", "Nelson", 3, NULL),
        (4, "Christian", "Henry", 4, 5),
        (5, "Erin", "Lim", 5, NULL),
        (6, "Jorris", "Powathil", 6, 9),
        (7, "Celia", "Pennington", 7, 8),
        (8, "Jessamyn", "McTwigan", 8, NULL),
        (9, "Thomas", "Limmer", 9, NULL)

