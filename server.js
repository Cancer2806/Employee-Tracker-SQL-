// Define the required modules
// const inquirer = require('inquirer');
const consoleTable = require('console.table')

const { mainMenu, getDeptName, getRoleDetails, selectDept, getEmployeeDetails, changeRole, selectRole, selectEmployee } = require(`./src/questions`);
const { viewAllDept, addDept, deleteDept } = require('./src/departments');
const { viewAllRoles, addRole, deleteRole } = require('./src/roles');
const { viewAllEmployees, addEmployee, updateRole, viewDeptEmployees, deleteEmployee, deptBudget } = require('./src/employees');


// Main controlling function
function main() {
// call mainMenu file in questions.js to provide options on startup using inquirer:
  // console.clear();
  mainMenu()
  .then((actions) => {
    // Depending on action chosen, execute the appropriate code
    const { chosenAction } = actions;
    switch (chosenAction) {
      case 'View All Employees':
        // Call function to read employee records and then display with console.table
        return viewAllEmployees()
          .then((result) => {
            console.clear();
            console.table(result);
            console.log(`Press up/down arrow to continue`);
          });
        break;
      case 'View Employees by Dept':
        // Call function to read employee records for a specified department and then display with console.table
        return selectDept("Which department do you want to view:")
          .then((response) => {
            const { dept } = response;
            viewDeptEmployees(dept)
              .then((result) => {
                console.clear();
                console.log(`Press up/down arrow to continue \n \n`);
                console.table(result);
              })
          });
        break;
      case 'Add an Employee':
      // prompt for employee details and add to the database
        return getEmployeeDetails()
          .then((details) => {
            const { firstName, lastName, role, mgr } = details;
            addEmployee(firstName, lastName, role, mgr);
            console.log(`\n ${firstName} ${lastName} added to Employee Database \n`);
          });
        break;
      case `Update an Employee's Role`:
        // prompt for employee name and new role
        return changeRole()
          .then((details) => {
            const { empName, newRole } = details;
            updateRole(empName, newRole);
            console.log(`\n ${empName} title updated to ${newRole} \n`);
          });
        break;
      case 'Delete an Employee':
        // prompt for the employee to be deleted
        return selectEmployee()
          .then((response) => {
            const { employee } = response;
            deleteEmployee(employee)
          });
      case 'View All Roles':
        // Call function to read all roles and then display with console.table
        return viewAllRoles()
          .then((result) => {
            console.clear();
            console.log(`Press up/down arrow to continue \n \n`);
            console.table(result);
          });
        break;
      case 'Add a Role':
        // prompt for rquired details and then add to database
        return getRoleDetails()
          .then((responses) => {
            const { newRole, newSalary, dept } = responses;
            addRole(newRole, newSalary, dept);
            console.log(`\n ${newRole} added to Database \n`);
      });
        break;
      case 'Delete a Role':
        // prompt for role title to be deleted
        return selectRole()
          .then((response) => {
            const { role } = response;
            deleteRole(role)
          });
        break;
      case 'View All Departments':
        // Call function to read all departments and then display with console.table
        return viewAllDept()
          .then((result) => {
            console.clear();
            console.log(`Press up/down arrow to continue \n \n`);
            console.table(result);
          });
        break;
      case 'Add a Department':
        // prompt for new department name and then add to database
        return getDeptName()
          .then((response) => {
            const { newDept } = response;
            addDept(newDept);
            // console.log(`\n ${newDept} added to Database \n`);
          });
        break;
      case 'Delete a Department':
        // prompt for new department name and then add to database
        return selectDept("Which department do you want to delete?")
          .then((response) => {
            const { dept } = response;
            deleteDept(dept)
          });
        break;
      case 'View Department Budget':
        // Call function to determine annual budget of a department
        return selectDept("Which department's budget do you want to view:")
          .then((response) => {
            const { dept } = response;
            deptBudget(dept)
          });
        break;
      default:
        {
          console.log(`\n Enjoy the rest of your day :)`);
          process.exit(0);  };
    };
  })
    // Return to get further actions until User selects Quit
    .then(() => {
      main();  
  })
  
  .catch ((error) => {
    console.log(`\n Something went wrong.  This is the error message: ${error}`);
  })
}

// Commence the Application
console.clear();
main();


/* Optional extras
*  Update employee managers.
*  View employees by manager.
*/