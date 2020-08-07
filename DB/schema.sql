DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (department_id)
);

CREATE TABLE role (
  role_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) ,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (role_id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id VARCHAR(30),
	PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales Lead"),
("Salesperson"),
("Lead Engineer"),
("Software Engineer"),
("Account Manager"),
("Accountant"),
("Legal Team Lead");

INSERT INTO role ( title, salary, department_id)
VALUES ( "CTO","100",1), ("CFO","200",2), ("CEO","300",3);

INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null ), 
("Mike", "Chan", 2, "Tom Tupik" ),
("Tom", "Tupik", 3, null );

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- View All Employees
SELECT 
e.id AS ID,
e.first_name AS First_Name,
e.last_name AS Last_Name,
r.title AS Title, 
r.salary AS Salary,
d.name AS Department,
e.manager_id AS Manager
FROM role r JOIN department d ON (r.department_id = d.department_id)
LEFT JOIN employee e ON ( e.role_id = r.role_id);

-- View Employees by department
SELECT
d.name AS Department,
e.first_name AS First_Name,
e.last_name AS Last_Name
FROM role r JOIN department d ON (r.department_id = d.department_id)
LEFT JOIN employee e ON ( e.role_id = r.role_id)
WHERE (d.name = "Lead Engineer" );

-- View Employees by Manger
SELECT 