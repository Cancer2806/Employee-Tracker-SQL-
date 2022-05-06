-- create department records for testing --
INSERT INTO departments(dept_name)
VALUES 
  ("Engineering"),
  ("Sales"),
  ("Legal"),
  ("Finance"),
  ("Maintenance"),
  ("Administration");

-- create employee roles for testing --
INSERT INTO roles (title, salary, department_id)
VALUES 
  ("Senior Engineer", 75000, 1),
  ("Senior Accountant", 70000, 4),
  ("Secretary", 25000, 6),
  ("Sales Lead", 100000, 2),
  ("Lead Engineer", 100000, 1),
  ("Software Engineer", 45000, 1),
  ("Account Manager", 125000, 4),
  ("Legal Team Lead", 250000, 3), 
  ("Lawyer", 190000, 3),
  ("Salesperson", 30000, 2),
  ("Plant Manager", 150000, 5),
  ("Maintenance Engineer", 100000, 5),
  ("HR Manager", 80000, 6),
  ("Janitor", 20000, 5),
  ("Intern", 15000, 1);

-- create managers and employees for testing --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Ashley", "Rodriguez", 4, NULL),
  ("Malia", "Brown", 7, NULL),
  ("Kevin", "Tupik", 5, NULL),
  ("Washed", "Up", 11, NULL),
  ("Gingerly", "Working", 13, NULL),
  ("Never", "Truthful", 8, NULL),
  ("John", "Smith", 1, 3),
  ("John", "Doe", 2, 2),
  ("Mike", "Chan", 3, 5),
  ("Kunal", "Singh", 6, 3),
  ("Sarah", "Lourd", 3, 5),
  ("Tom", "Allen", 6, 5),
  ("Genius", "Fisher", 10, 1),
  ("Always", "Eating", 12, 4),
  ("Wonder", "Kid", 14, 4),
  ("Apples", "Oranges", 1, 3),
  ("Big", "Hitter", 10, 1),
  ("Artful", "Dodger", 10, 1),
  ("Cunning", "Spy", 10, 1),
  ("Always", "Honest", 9, 6),
  ("Nearly", "Finished", 6, 3);