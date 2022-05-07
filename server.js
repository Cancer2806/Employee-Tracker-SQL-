// Define the required modules
const inquirer = require('inquirer');
const consoleTable = require('console.table')

// const { connect } = require('./db/connect');
const { viewAllDept } = require('./src/departments');
const { viewAllRoles } = require('./src/roles');
const { viewAllEmployees } = require('./src/employees');


// Use inquirer to provide options on startup:
function getAction() {
  return inquirer.prompt([
    {
      name: "chosenAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit"
      ],
    }
  ]).then((actions) => {
    // Depending on action chosen, execute the appropriate action
    const { chosenAction } = actions;
    switch (chosenAction) {
      case 'View All Employees':
        {
          // Call function to read employee records and then display with console.table
          const display = viewAllEmployees()
            .then((result) => {
              console.log(`\n`);
              console.table(result);
            });
          break;
        }
      case 'Add Employee':
        { console.log(`Add Employee ${chosenAction}`) }
        break;
      case 'Update Employee Role':
        { console.log(`Update Employee Role ${chosenAction}`) }
        break;
      case 'View All Roles':
        {
          // Call function to read all roles and then display with console.table
          const display = viewAllRoles()
            .then((result) => {
              console.log(`\n`);
              console.table(result);
            });
          break;
        }
      case 'Add Role':
        { console.log(`Add Role ${chosenAction}`) }
        break;
      case 'View All Departments':
        {
          // Call function to read all departments and then display with console.table
          const display = viewAllDept()
            .then((result) => {
              console.log(`\n`);
              console.table(result);
            });
          break;
        }
      case 'Add Department':
        { console.log(`Add Department ${chosenAction}`) }
        break;
      default:
        {
          console.log(`Enjoy the rest of your day :)`);
          process.exit(0);  };
    };
    
    // Return to get further actions until User selects Quit
    getAction();
  })
    
  .catch ((error) => {
    console.log(`Something went wrong.  This is the error message: ${error}`);
  })
}

// Commence the Application
getAction();


/*  WHEN I choose to add a department
*  THEN I am prompted to enter the name of the department and that department is added to the database
*/

/*  WHEN I choose to add a role
*  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
*/

/*  WHEN I choose to add an employee
*  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
*/

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
*  View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
*/