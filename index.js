var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Mysqlalex@1z.",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
  //   connection.end();
});

function viewAllEmployees() {
  var querySelect = "SELECT ";
  querySelect += "e.id AS ID, ";
  querySelect += "e.first_name AS First_Name, ";
  querySelect += "e.last_name AS Last_Name, ";
  querySelect += "r.title AS Title,  ";
  querySelect += "r.salary AS Salary, ";
  querySelect += "d.name AS Department, ";
  querySelect += "e.manager_id AS Manager ";
  querySelect +=
    "FROM role r JOIN department d ON (r.department_id = d.department_id) ";
  querySelect += "LEFT JOIN employee e ON ( e.role_id = r.role_id); ";
  // querySelect += "";
  // console.log(querySelect);
  connection.query(querySelect, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
}

function viewAllEmployeesByDep() {
  inquirer
    .prompt({
      type: "list",
      name: "department",
      message: "Which department you want to visit",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
      ],
    })
    .then(function (answer) {
      //   console.log(answer.department);
      console.log(`Here is ${answer.department}`);
      var querySelect = "SELECT ";
      querySelect += "d.name AS Department, ";
      querySelect += "e.first_name AS First_Name, ";
      querySelect += "e.last_name AS Last_Name ";
      querySelect +=
        "FROM role r JOIN department d ON (r.department_id = d.department_id)";
      querySelect += "LEFT JOIN employee e ON ( e.role_id = r.role_id)";
      querySelect += `WHERE (d.name = "${answer.department}" );`;
      connection.query(querySelect, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

function viewAllEmployeesByMag() {
  inquirer
    .prompt({
      type: "list",
      name: "manager",
      message: "Which Manager you want to visit? ",
      choices: ["Tom Tupik"],
    })
    .then(function (answer) {
      console.log(`Here is ${answer.manager}`);
      var querySelect = "SELECT ";
      querySelect += "e.manager_id AS Manager, ";
      querySelect += "e.first_name AS E_First_Name, ";
      querySelect += "e.last_name AS E_Last_Name ";
      querySelect +=
        "FROM role r JOIN department d ON (r.department_id = d.department_id) ";
      querySelect += "LEFT JOIN employee e ON ( e.role_id = r.role_id) ";
      querySelect += `WHERE (e.manager_id = "${answer.manager}" ); `;
      //   console.log(querySelect);
      connection.query(querySelect, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
      });
    });
}

async function addEmployee() {
  await inquirer
    .prompt([
      { name: "first_name", message: "What the employee's First Name: " },
      { name: "last_name", message: "What the employee's Last Name: " },
      { name: "title", message: "What the employee's Title: " },
      { name: "salary", message: "Whit the employee's Salary: " },
      {
        type: "rawlist",
        name: "department",
        message: "What the employee's department: ",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
        ],
      },
      {
        type: "list",
        name: "manager",
        message: "What the employee's Manager: ",
        choices: ["Tom Tupik", "John Doe", "Mike Chan"],
      },
    ])
    .then(function (answer) {
      var querySelect = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.title}", "${answer.salary}",${answer.department})`;
      console.log(querySelect);
      start();
    });
}

function start() {
  inquirer
    .prompt({
      type: "list",
      name: "userTodo",
      message: "What would you like to do? ",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.userTodo) {
        case "View All Employees":
          // code block
          console.log("Here is all employees:");
          viewAllEmployees();
          break;
        case "View All Employees By Department":
          // code block
          console.log("Here is all employees by Department:");
          viewAllEmployeesByDep();
          break;
        case "View All Employees By Manager":
          // code block
          console.log("Here is all employees by Manager:");
          viewAllEmployeesByMag();
          break;
        case "Add Employee":
          // code block
          console.log("You Added an Employee!");
          addEmployee();
          break;
        case "Remove Employee":
          // code block
          console.log("You remove an Employee");
          break;
        case "Update Employee Role":
          // code block
          console.log("You updated an employee role info");
          break;
        case "Update Employee Manager":
          // code block
          console.log("You updated an employee manager info");
          break;
        case "EXIT":
          // code block
          console.log("Exit Successfully");
          connection.end();
          break;
        default:
          console.log("Sorr try again");
      }
    });
}
