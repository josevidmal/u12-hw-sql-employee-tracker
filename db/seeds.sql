INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jose", "Vidal", 1, NULL),
        ("Joe", "Maza", 2, 1),
        ("Alonso", "Fernandez", 3, NULL),
        ("Mark", "Smith", 4, 3),
        ("Amy", "Wilson", 5, NULL),
        ("Roy", "Phillips", 6, 5),
        ("Kelly", "Anderson", 7, NULL),
        ("Trevor", "Winston", 8, 7);