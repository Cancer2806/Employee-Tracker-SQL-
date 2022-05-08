// Define the required modules
const inquirer = require('inquirer');
const consoleTable = require('console.table')

// const { connect } = require('./db/connect');
const { viewAllDept, addDept } = require('./src/departments');
const { viewAllRoles, addRole } = require('./src/roles');
const { viewAllEmployees, addEmployee } = require('./src/employees');

/*WHEN I start the application THEN I am presented with the following options: 
* view all departments, view all roles, view all employees, add a department, 
* add a role, add an employee, and update an employee role
*/
// Call inquirer to display the main menu
function mainMenu() {
  return inquirer.prompt([
    {
      name: "chosenAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee's Role",
        "Quit",
      ],
    }
  ])
};

/*  WHEN I choose to add a department
*  THEN I am prompted to enter the name of the department and that department is added to the database
*/
// Use inquirer to obtain the new department name
function getDeptName() {
  return inquirer.prompt([
    {
      name: "newDept",
      type: "input",
      message: "Please enter the name of the Department to be added:",
    }
  ])
};

/*  WHEN I choose to add a role
*  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
*/
// Use inquirer to obtain the details of the new role
async function getRoleDetails() {
  // function to populate the department list in the inquirer statement
  const listDept = [];
  await viewAllDept()
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        listDept.push(result[i].Department);
      };
    })
      return inquirer.prompt([
        {
          name: "newRole",
          type: "input",
          message: "Please enter the title of the new role:",
        },
        {
          name: "newSalary",
          type: "input",
          message: "Please enter the salary that applies to the role:",
        },
        {
          name: "dept",
          type: "list",
          message: "Which department does the role belong to:",
          choices: listDept,
        }
      ])
};

/*  WHEN I choose to add an employee
*  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
*/
// Use inquirer to obtain the details of the new employee
async function getEmployeeDetails() {
  // variables to hold arrays for choosing role and manager
  const listRoles = [];
  const listMgrs = ["None"];
  await viewAllRoles()
    .then((results) => {
      for (let i = 0; i < results.length; i++) {
        listRoles.push(results[i].Title);
      }
    });
    await viewAllEmployees()
      .then((results) => {
        for (let i = 0; i < results.length; i++) {
            let strName = `${results[i]["First Name"]} ${results[i]["Last Name"]}`
            listMgrs.push(strName);
          }
        })
        // return console.log(`list Roles ${listRoles}, list manager ${listMgrs}`)
  return inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: listRoles,
    },
    {
      name: "mgr",
      type: "list",
      message: "Who will the employee report to?",
      choices: listMgrs,
    }
  ])
}
    

// Main controlling function
function main() {
// Use inquirer to provide options on startup:
  mainMenu()
  .then((actions) => {
    // Depending on action chosen, execute the appropriate code
    const { chosenAction } = actions;
    switch (chosenAction) {
      case 'View All Employees':
        {
          // Call function to read employee records and then display with console.table
          return viewAllEmployees()
            .then((result) => {
              console.table(result);
            });
          break;
        }
      case 'Add an Employee':
      // prompt for employee details and add to the database
        return getEmployeeDetails()
          .then((details) => {
            const { firstName, lastName, role, mgr } = details;
            addEmployee(firstName, lastName, role, mgr)
          });
        break;
      case `Update an Employee's Role`:
        { console.log(`Update Employee Role ${chosenAction}`) }
        break;
      case 'View All Roles':
        {
          // Call function to read all roles and then display with console.table
          return viewAllRoles()
            .then((result) => {
              console.table(result);
            });
          break;
        }
      case 'Add a Role':
        // prompt for rquired details and then add to database
          return getRoleDetails()
            .then((responses) => {
              const { newRole, newSalary, dept } = responses;
              addRole(newRole, newSalary, dept)
      });
        break;
      case 'View All Departments':
        {
          // Call function to read all departments and then display with console.table
          return viewAllDept()
            .then((result) => {
              console.table(result);
            });
          break;
        }
      case 'Add a Department':
        // prompt for new department name and then add to database
        return getDeptName()
            .then((response) => {
              const { newDept } = response;
              addDept(newDept);
              console.log(`New deparment added`);
            });
        break;
      default:
        {
          console.log(`Enjoy the rest of your day :)`);
          process.exit(0);  };
    };
  })
    // Return to get further actions until User selects Quit
    .then(() => {
      main();  
  })
  
  .catch ((error) => {
    console.log(`Something went wrong.  This is the error message: ${error}`);
  })
}

// Commence the Application
main();




/*  WHEN I choose to update an employee role
*  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/




/* Options if have time
*  make your queries asynchronous
*  use a separate file that contains functions for performing specific SQL queries
*  A constructor function or class could be helpful for organizing these
*  Update employee managers.
*  View employees by manager.
*  View employees by department.
*  Delete departments, roles, and employees.
*  View the total utilized budget of a department;in other words, the combined salaries of all employees in that department.
*/