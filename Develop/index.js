const inquirer = require("inquirer");


function firstPrompt() {
inquirer
  .prompt([
    {
      type: "rawlist",
      name: "firstPrompt",
      message: "What would you like to do?",
      choices: [
        { name: "view all departments", value: "view_depts" },
        { name: "View all roles", value: "view_roles" },
        { name: "view all employees", value: "view_employees" },
        { name: "add a department", value: "add_department" },
        { name: "add a role", value: "add_role" },
        { name: "add an employee", value: "add_employee" },
        { name: "update an employee role", value: "update_role" },
      ],
    },
  ])
  .then((data) => {
    let choice = data.firstPrompt;
    //switch case here - make functions for each choice, call respective function in each case
    function handleFirstPrompt(choice)
      switch (choice) {
        case "view_depts":
          choice = ``;
          break;
        case "view_roles":
          choice = ``;
          break;
        case "view_employees":
          choice = ``;
          break;
        case "add_department":
          choice = ``;
          break;
        case "add_role":
          choice = ``;
          break;
        case "add_employee":
          choice = ``;
          break;
        case "update_role":
          choice = ``;
          break;
        default:
          choice = "";
          break;
      }
      return choice;
    }
  )};
//Take all prompts, format, re-run first prompt


//How to display departments and IDs dynamically? Jquery maybe
function viewDepartmentsPrompt() {
inquirer
  .prompt([
    {
      type: "rawlist",
      name: "viewDepartmentsPrompt",
      message: "What would you like to do?",
      choices: [
        { name: "view all departments", value: "view_depts" },
        { name: "View all roles", value: "view_roles" },
        { name: "view all employees", value: "view_employees" },
        { name: "add a department", value: "add_department" },
        { name: "add a role", value: "add_role" },
        { name: "add an employee", value: "add_employee" },
        { name: "update an employee role", value: "update_role" },
      ],
    },
  ])};

function addDepartmentPrompt() {
inquirer
  .prompt(
    {
      type: "input",
      message: "Please type the name of the new department",
      name: "newDepartment",
    },
  )};
function addRolePrompt() {
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
      //Add created departments dynamically
      choices: [
        { name: "view all departments", value: "view_depts" },
        { name: "View all roles", value: "view_roles" },
        { name: "view all employees", value: "view_employees" },
        { name: "add a department", value: "add_department" },
        { name: "add a role", value: "add_role" },
        { name: "add an employee", value: "add_employee" },
        { name: "update an employee role", value: "update_role" },
      ],
    },
  )
};
function addEmployeePrompt() {
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
      //Add mamangers dynamically
      choices: [
        { name: "view all departments", value: "view_depts" },
        { name: "View all roles", value: "view_roles" },
        { name: "view all employees", value: "view_employees" },
        { name: "add a department", value: "add_department" },
        { name: "add a role", value: "add_role" },
        { name: "add an employee", value: "add_employee" },
        { name: "update an employee role", value: "update_role" },
      ],
    },
  )};

function updateRolePrompt() {
inquirer
  .prompt(
    {
      type: "rawlist",
      message: "Please select an employee",
      name: "promotedEmployee",
      //Add manangers dynamically
      choices: [
        { name: "view all departments", value: "view_depts" },
        { name: "View all roles", value: "view_roles" },
        { name: "view all employees", value: "view_employees" },
        { name: "add a department", value: "add_department" },
        { name: "add a role", value: "add_role" },
        { name: "add an employee", value: "add_employee" },
        { name: "update an employee role", value: "update_role" },
      ],
    },{
      type: "rawlist",
      message: "Please select the employee's new role",
      name: "promotedEmployeeRole",
      //Add manangers dynamically
      choices: [
        { name: "view all departments", value: "view_depts" },
        { name: "View all roles", value: "view_roles" },
        { name: "view all employees", value: "view_employees" },
        { name: "add a department", value: "add_department" },
        { name: "add a role", value: "add_role" },
        { name: "add an employee", value: "add_employee" },
        { name: "update an employee role", value: "update_role" },
      ],
    },
  )};