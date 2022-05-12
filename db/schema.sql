 -- Check for existing database and delete if found --
DROP DATABASE IF EXISTS employees_db;
-- Create database --
CREATE DATABASE employees_db;

-- Identify the database to be used --
USE employees_db;

-- Create tables within the database --
-- deparments table will hold the departments within the establishment --
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL UNIQUE
);

-- roles table will contain the job titles within the organisation --
-- each role must be assigned to a department - link departments table with foreign key --
-- department cannot be deleted whilst it has roles linked to it --
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL UNIQUE,
  salary decimal,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE NO ACTION
);

-- employees table will contain the employees details --
-- each employee must be assigned a role title - link roles table with foreign key --
-- role cannot be deleted whilst it has employees linked to it --
-- each employee may optionally be assigned to a manager who will also be listed in the employees table --
-- employee cannot be deleted if other employees are reporting to that employee --
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE NO ACTION,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id)
  ON DELETE NO ACTION
);