const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "employees_db",
  },
  console.log(`Connected to the database.`)
);

//-------Query functions for prompts-----------
function returnManagerName() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT CONCAT(first_name, " ", last_name) AS name FROM employees WHERE manager_id IS NULL;',
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          const employeeManager = results.map((i) => {
            return `${i.name}`;
          })
          resolve(employeeManager);
          console.log(results);
        }
      }
    );
  });
};

function returnDepartmentList() {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, departments.name AS department FROM departments',
      (err, results) => {
        if (err) {
          console.log(err);
        } else {
          const departmentList = results.map((i) => {
            return `${i.name}`;
          })
          resolve(departmentList);
          console.log(results);
        }
      }
    );
  });
};


//create constructor objects - functions for each switch case
//method
//return, queries for each
function firstPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "firstPrompt",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      let choice = answer.firstPrompt;
      //switch case - functions for each choice, calls respective function in each case
      console.log(choice);
      switch (choice) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Quit":
          return;
      }
    });
}
//Take all prompts, format, re-run first prompt

//db query for
function viewDepartments() {
  //DONE
  db.query(
    "SELECT id, departments.name AS department FROM departments",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        firstPrompt();
      }
    }
  );
}

function viewAllRoles() {
  //DONE
  db.query(
    "SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM employees_db.roles INNER JOIN departments ON roles.department_id = departments.id",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        firstPrompt();
      }
    }
  );
}

function viewAllEmployees() {
  //NOT DONE - SQL syntax error, something to do with 'FROM' and returning employee's manager
  db.query(
    "SELECT employees.id, CONCAT(first_name, ' ', last_name) AS employee, employees.role_id AS role FROM roles RIGHT JOIN employees ON roles.title = employees.role_id, employees.manager_id AS manager FROM employees SELF JOIN employees ON manager_id = CONCAT (first_name, ' ', last_name)",
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.table(results);
        firstPrompt();
      }
    }
  );
}

function addDepartment(name) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of this department?: ",
        name: "departmentName",
      },
    ])

    //Adds data
    .then((response) => {
      console.log(response);
      let departmentName = response.name;
      //NOT DONE: "department" comes back as null
      db.query(
        `INSERT INTO departments (name) VALUES (${departmentName});`,
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            firstPrompt();
          }
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt(
      {
        type: "input",
        message: "Please enter the name of the new role",
        name: "roleName",
      },
      {
        type: "input",
        message: "Please enter the salary",
        name: "roleSalary",
      },
      {
        type: "rawlist",
        message: "Please select the department",
        name: "roleDepartment",
        choices: [
          returnDepartmentList()
        ],
      }
    )

    //Add data via db query
    .then((response) => {
      console.log(response);
      //let statements for each prompt
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES",
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            firstPrompt();
          }
        }
      );
    });
}

async function addEmployee() {
  inquirer
    .prompt(
      {
        type: "input",
        message: "Please enter the new employee's first name",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "Please enter the new employee's last name",
        name: "employeeLastName",
      },
      {
        type: "input",
        message: "What is this employee's role?",
        name: "employeeRole",
      },
      {
        type: "list",
        message: "Please select the new employee's manager",
        name: "employeeManger",
        choices: [returnManagerName()],
      }
    )
    .then((response) => {
      console.log(response);
      //let statements for each prompt
      let firstName = response.employeeFirstName;
      let lastName = response.employeeLastName;
      let employeeRole = response.employeeRole;
      let managerId = response.employeeManager;
      db.query(
        `INSERT INTO employees (first_name, last_name, role, manager_id) VALUES (${firstName}, ${lastName}, ${employeeRole}, ${managerId});`,
        [],
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.table(results);
            firstPrompt();
          }
        }
      );
    });
}
//How would I set this up? Would it have to
function updateEmployeeRole() {
  //inquirer prompts
  //Seed data
  //.then((response) => {
  console.log(response);
  //let statements for each prompt
  db.query(
    "UPDATE employees, SET role = ? WHERE id = ?, SELECT from ID, Change Role",
    (err, answer) => {
      //role = foreign key

      if (err) {
        console.log(err);
      } else {
        console.table(results);
        firstPrompt();
      }
      // })
    }
  );
}

firstPrompt();
