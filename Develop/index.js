const inquirer = require("inquirer");
const mysql = require('mysql2');

//create constructor objects - functions for each switch case
//method
    //return, queries for each
function firstPrompt() {
inquirer
  .prompt([
    {
      type: "rawlist",
      name: "firstPrompt",
      message: "What would you like to do?",
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update an employee role'
      ],
    },
  ])
  .then((answer) => {
    let choice = answer.firstPrompt;
    //switch case here - make functions for each choice, call respective function in each case
      switch (choice) {
        case "View Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add A Department":
          addDepartment();
          break;
        case "Add A Role":
          addRole();
          break;
        case "Add An Employee":
          addEmployee();
          break;
        case "Update An Employee's Role":
          updateEmployeeRole();
          break;
        case "Quit":
          return;
      }
    }
)};
//Take all prompts, format, re-run first prompt

//db query for
function viewDepartments() {
  db.query('SELECT id, title, department.name AS department FROM department', (err, answer) => {
    if (err) {
      console.log(err)
    } else {
      firstPrompt();
    }   
  }
)};

function viewAllRoles() {
  db.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      firstPrompt();
    }   
  }
)};

function viewAllEmployees() {
  db.query('SELECT * from employees', (err, results) => {
    if (err) {
      console.log(err)
    } else {
      firstPrompt();
    }   
  }
)};


function addDepartment() {
  inquirer
    .prompt([
      {
      type: "input",
      message: "What is the name of this department?: ",
      name: "departmentName",
      } 
    ])

//Seed data
.then((response) => {
  console.log(response);
  let departmentName = response.name;
  db.query('INSERT INTO something', (err, answer) => {
    if (err) {
      console.log(err)
    } else {
      console.log(departmentName);
      firstPrompt();
    }   
  })
}
)};

function addRole() {
  inquirer.prompt(
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
          //How to add roles based on input?
        ],
      },
    )

//Seed data
.then((response) => {
  console.log(response);
  //let statements for each prompt
  db.query('INSERT INTO something', (err, answer) => {
    if (err) {
      console.log(err)
    } else {
      firstPrompt();
    }   
  })
}
)};

function addEmployee() {
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
      type: "rawlist",
      message: "Please select the new employee's manager",
      name: "employeeManger",
      choices: [
      ],
    },
  )
.then((response) => {
  console.log(response);
  //let statements for each prompt
  db.query('INSERT INTO something', (err, answer) => {
    if (err) {
      console.log(err)
    } else {
      firstPrompt();
    }
    })
  }
)};
//How would I set this up? Would it have to 
  function updateEmployeeRole() {
    //inquirer prompts
//Seed data
//.then((response) => {
  console.log(response);
  //let statements for each prompt
  db.query('UPDATE employees, SET role = ? WHERE id = ?, SELECT from ID, Change Role', (err, answer) => {
    //role = foreign key
    
    
    if (err) {
      console.log(err)
    } else {
      firstPrompt();
    }   
  // })
});
}; 

firstPrompt();