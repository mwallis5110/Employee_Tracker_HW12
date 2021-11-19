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
function returnManagerList() {
  return db
    .promise()
    .query(
      "SELECT DISTINCT employees.manager_id, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN employees manager ON employees.manager_id = manager.id;"
    );
}

function returnDepartmentList() {
  return db
    .promise()
    .query(
      "SELECT departments.id, departments.name AS department FROM departments;"
    );
}

function returnEmployeeList() {
  return db
    .promise()
    .query(
      "SELECT employees.id, CONCAT(first_name, ' ', last_name) AS employee FROM employees;"
    );
}

function returnRolesList() {
  return db.promise().query("SELECT roles.id, roles.title AS role FROM roles;");
}

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
          "Delete an employee",
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
        case "Delete an employee":
          deleteEmployee();
          break;
        case "Quit":
          return;
      }
    });
}
//Take all prompts, format, re-run first prompt

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
    "SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM employees_db.roles INNER JOIN departments ON roles.department_id = departments.id;",
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
  //DONE
  db.query(
    "SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name) AS full_name, roles.title AS role, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN employees manager ON employees.manager_id = manager.id;",
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

function addDepartment() { //WORKS, but should display proper table after completing
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of this department?: ",
        name: "newDepartmentName",
      },
    ])
    //Adds data
    .then((response) => {
      let departmentName = response.newDepartmentName;
      db.query(
        "INSERT INTO departments (name) VALUES (?);",
        [departmentName],
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

async function addRole() {
  //WORKS, but should display proper table after completing
  let departmentListResults = await returnDepartmentList();
  let departmentListDisplay = departmentListResults[0].map((i) => {
    return { value: i.id, name: i.department };
  });
  inquirer
    .prompt([
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
        choices: departmentListDisplay,
      },
    ])

    .then((response) => {
      let roleName = response.roleName;
      let roleSalary = response.roleSalary;
      let roleDepartment = response.roleDepartment;
      db.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?);",
        [roleName, roleSalary, roleDepartment],
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
  //WORKS, but should display proper table after completing
  let managerListResults = await returnManagerList();
  let managerListDisplay = managerListResults[0].map((i) => {
    return { value: i.manager_id, name: i.manager_name };
  });

  let roleListResults = await returnRolesList();
  let rolesListDisplay = roleListResults[0].map((i) => {
    return { value: i.id, name: i.role };
  });

  inquirer
    .prompt([
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
        type: "list",
        message: "What is this employee's role?",
        name: "employeeRole",
        choices: rolesListDisplay,
      },
      {
        type: "list",
        message: "Please select the new employee's manager",
        name: "employeeManager",
        choices: managerListDisplay,
      },
    ])
    .then((response) => {
      //let statements for each prompt
      let firstName = response.employeeFirstName;
      let lastName = response.employeeLastName;
      let employeeRole = response.employeeRole;
      let managerId = response.employeeManager;
      db.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);",
        [firstName, lastName, employeeRole, managerId],
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

async function updateEmployeeRole() {
  let employeeListResults = await returnEmployeeList();
  let employeeListDisplay = employeeListResults[0].map((i) => {
    return { value: i.id, name: i.employee };
  });

  let roleListResults = await returnRolesList();
  let rolesListDisplay = roleListResults[0].map((i) => {
    return { value: i.id, name: i.role };
  });

  let managerListResults = await returnManagerList();
  let managerListDisplay = managerListResults[0].map((i) => {
    return { value: i.manager_id, name: i.manager_name };
  });

  inquirer
    .prompt([
      {
        type: "list",
        message: "Please select the employee you would like to update",
        name: "updatedEmployee",
        choices: employeeListDisplay,
      },
      {
        type: "list",
        message: "What is this employee's new role?",
        name: "employeeRole",
        choices: rolesListDisplay,
      },
      {
        type: "list",
        message: "Who is this employee's new manager?",
        name: "updatedManager",
        choices: managerListDisplay,
      },
    ])

    .then((response) => {
      let employeeName = response.updatedEmployee;
      let updatedEmployeeRole = response.employeeRole;
      let updatedEmployeeManager = response.updatedManager;
      db.query(
        "UPDATE employees () VALUES;",
        [employeeName, updatedEmployeeRole, updatedEmployeeManager],
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

async function deleteEmployee() {
  let employeeListResults = returnEmployeeList();
  let employeeListDisplay = employeeListResults[0].map((i) => {
    return `${i.employee}`;
  });
  inquirer
    .prompt({
      type: "list",
      message: "Please select the employee you would like to delete",
      choices: employeeListDisplay,
    })
    //Seed data
    .then((response) => {
      let employeeDeleteName = response.name;
      db.query(
        "DELETE FROM employees WHERE id = ?;",
        [employeeDeleteName],
        (err, results) => {
          //role = foreign key

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

firstPrompt();
