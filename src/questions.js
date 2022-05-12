// Define the required modules
const inquirer = require('inquirer');
const consoleTable = require('console.table')

const { viewAllDept, addDept, deleteDept } = require('./departments');
const { viewAllRoles, addRole } = require('./roles');
const { viewAllEmployees, addEmployee, updateRole, viewDeptEmployees } = require('./employees');

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
        "View All Employees",
        "View Employees by Dept",
        "View Employees by Manager",
        "Add an Employee",
        "Update an Employee's Role",
        "Update an Employee's Manager",
        "Delete an Employee",
        "View All Roles",
        "Add a Role",
        "Delete a Role",
        "View All Departments",
        "Add a Department",
        "Delete a Department",
        "View Department Budget",
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
      listDept.sort();
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

// Delete a role
async function selectRole() {
  // function to populate the roles in the inquirer statement
  const listRoles = [];
  await viewAllRoles()
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        listRoles.push(result[i].Title);
      };
      listRoles.sort();
    })
  return inquirer.prompt([
    {
      name: "role",
      type: "list",
      message: "Which role do you want to delete:",
      choices: listRoles,
    }
  ])
};

// Delete a department
async function selectDept(message) {
  // function to populate the department list in the inquirer statement
  const listDept = [];
  await viewAllDept()
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        listDept.push(result[i].Department);
      };
      listDept.sort();
    })
  return inquirer.prompt([
    {
      name: "dept",
      type: "list",
      message: message,
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
      };
      listRoles.sort();
    });
    await viewAllEmployees()
      .then((results) => {
        for (let i = 0; i < results.length; i++) {
            let strName = `${results[i]["First Name"]} ${results[i]["Last Name"]}`
            listMgrs.push(strName);
        };
        listMgrs.sort();
        })
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

/*  WHEN I choose to update an employee role
*  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
*/
// Use inquirer to obtain the details of the new employee
async function changeRole() {
  // variables to hold arrays for choosing role and manager
  const listRoles = [];
  const listEmps = [];
  await viewAllRoles()
    .then((results) => {
      for (let i = 0; i < results.length; i++) {
        listRoles.push(results[i].Title);
      };
      listRoles.sort();
    });
  await viewAllEmployees()
    .then((results) => {
      for (let i = 0; i < results.length; i++) {
        let strName = `${results[i]["First Name"]} ${results[i]["Last Name"]}`
        listEmps.push(strName);
      };
      listEmps.sort();
    })
  return inquirer.prompt([
    {
      name: "empName",
      type: "list",
      message: "Which employee do you want to change?",
      choices: listEmps,
    },
    {
      name: "newRole",
      type: "list",
      message: "Select the new Role:",
      choices: listRoles,
    }
  ])
}


async function selectEmployee(message) {
  // variables to hold arrays for choosing employee
  const listEmps = [];
  await viewAllEmployees()
    .then((results) => {
      let strName;
      for (let i = 0; i < results.length; i++) {
        // console.log(results[i]["Manager"]);
        if (message === "Which manager's employees would you like to see:") {
          if (results[i]["Manager"] === "Manager") {
            strName = `${results[i]["First Name"]} ${results[i]["Last Name"]}`;
            listEmps.push(strName);
          }
          
        } else {
        if (results[i]["Manager"] === "Manager") {
          strName = `${results[i]["First Name"]} ${results[i]["Last Name"]} is a Manager`
        } else {
          strName = `${results[i]["First Name"]} ${results[i]["Last Name"]} reporting to ${results[i]["Manager"]}`
        }
          listEmps.push(strName);
      };
      };
      listEmps.sort();
    })
  if (message === "Which employee do you want to change") {
    return inquirer.prompt([
      {
        name: "employee",
        type: "list",
        message: message,
        choices: listEmps,
      },
      {
        name: "manager",
        type: "list",
        message: "Who will the employee now report to - select self if Manager",
        choices: listEmps,
      }
    ])
    
  } else {
    return inquirer.prompt([
      {
        name: "employee",
        type: "list",
        message: message,
        choices: listEmps,
      }
    ])
  } 
}


// Export modules
module.exports = {
  mainMenu,
  getDeptName,
  getRoleDetails,
  selectDept,
  getEmployeeDetails,
  selectEmployee,
  changeRole,
  selectRole
};
