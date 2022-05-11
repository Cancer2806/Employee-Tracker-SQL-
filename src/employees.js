// Connect to Database
const consoleTable = require('console.table');
const { connect } = require("../db/connect");

// Create a new employee
async function addEmployee(firstName, lastName, role, mgr) {
  const mgrName = mgr.split(" ");
  let mgr_id;
  let addQuery;
  
  const connection = await connect();

  // query to return role_id.
  const queryRole = `SELECT id FROM roles WHERE title = "${role}"`;
  const [queryID] = await connection.query(queryRole);
  const role_id = queryID[0].id;
    
  // if mgr = "None" input NULL, otherwise query to find manager_id
  if (mgr !== "None") {
    const mgrQuery = `SELECT id FROM employees WHERE first_name = "${mgrName[0]}" AND last_name = "${mgrName[1]}"`;
    const [mgrID] = await connection.query(mgrQuery);
    mgr_id = mgrID[0].id;
  
  // Query for inserting the new employee record if has manager
    addQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role_id}, ${mgr_id})`;
  } else {
    // Query for inserting the new employee record if no manager
    addQuery = `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${firstName}", "${lastName}", ${role_id})`;
  };

  return connection.execute(addQuery)
    .then(() => {
      console.log(`\n Adding of ${firstName} successful`);
    })
    .catch(() => {
      console.log(`\n Adding of ${firstName} failed`);
    })
}

// Read all employee records
async function viewAllEmployees() {
  const connection = await connect();
  // select query to print employee table, sorted by department name and manager name, including department, title and salary
  const query = `SELECT e.id as 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS Title, departments.dept_name AS Department, roles.salary AS Salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name),'Manager') as 'Manager' FROM employees e JOIN roles ON roles.id = e.role_id JOIN departments ON departments.id = roles.department_id LEFT JOIN employees m ON m.id = e.manager_id ORDER BY departments.dept_name, m.first_name`;
  const [result] = await connection.query(query);
  if (result.length === 0) {
    console.log(`No employees found`);
  }
  return result;
}

// Read all employee records of a specified department
async function viewDeptEmployees(dept) {
  const connection = await connect();

  // query to extract the dept id based on the dept name
  const queryDept = `SELECT id FROM departments WHERE dept_name = "${dept}"`;
  const [queryID] = await connection.query(queryDept);
  const idDept = queryID[0].id;
  
  // select query to print employee table, of a specified department, sorted by first name, with manager name, title and salary
  const query = `SELECT e.id as 'ID', e.first_name AS 'First Name', e.last_name AS 'Last Name', roles.title AS Title, roles.salary AS Salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name),'Manager') as 'Manager' FROM employees e JOIN roles ON roles.id = e.role_id LEFT JOIN employees m ON m.id = e.manager_id WHERE roles.department_id = ${idDept} ORDER BY roles.title, m.first_name`;
  const [result] = await connection.query(query);
  if (result.length === 0) {
    console.log(`No employees found`);
  }
  return result;
}

// Update an employees role
async function updateRole(empName, newRole) {
 // Break name into first and last for the query
  const nameEmp = empName.split(" ");

  const connection = await connect();
  
  // query to extract the role id based on the role title
  const queryRole = `SELECT id FROM roles WHERE title = "${newRole}"`;
  const [queryID] = await connection.query(queryRole);
  const role_id = queryID[0].id;
  
  // query to extract the employee ID based on first and last name
  const empQuery = `SELECT id FROM employees WHERE first_name = "${nameEmp[0]}" AND last_name = "${nameEmp[1]}"`;
  const [employID] = await connection.query(empQuery);
  const empId = employID[0].id;
  
  // Query for updating the employees record
  const updateQuery = `UPDATE employees SET role_id = ${role_id} WHERE first_name = "${nameEmp[0]}" AND last_name = "${nameEmp[1]}"`;
   
  return connection.execute(updateQuery)
    .then(() => {
      console.log(`Update of ${empName}'s was successful`);
    })
    .catch(() => {
      console.log(`\n Update for ${empName} failed`);
    });
}


// Delete an employee
async function deleteEmployee(empName) {
  // Break name into first and last for the query
  const nameEmp = empName.split(" ");
  const connection = await connect();

  // Query for deleting the employees record
  const deleteQuery = `DELETE From employees WHERE first_name = "${nameEmp[0]}" AND last_name = "${nameEmp[1]}"`;

  return connection.execute(deleteQuery)
  .then(() => {
    console.log(`Deletion of ${empName} was successful`);
  })
    .catch(() => {
      console.log(`\n Cannot delete ${empName}`);
    })
}

async function deptBudget(dept) {
  const connection = await connect();

  // query to extract the dept id based on the dept name
  const queryDept = `SELECT id FROM departments WHERE dept_name = "${dept}"`;
  const [queryID] = await connection.query(queryDept);
  const idDept = queryID[0].id;
  
  // Query for calculating the sum of the employees in the department
  const sumQuery = `SELECT SUM(salary) AS TotalSalary FROM roles INNER JOIN employees ON employees.role_id = roles.id WHERE department_id = ${idDept}`;
  
  const [sumValue] = await connection.query(sumQuery);
  if (sumValue[0].TotalSalary) {
    console.clear();
    console.log(`\n The budget for ${dept} is ${sumValue[0].TotalSalary}`);  
    console.log(`Press up/down arrow to continue`);
  } else {
    console.clear();
    console.log(`\n There are no employees allocated to ${dept} and the budget is Nil`);
    console.log(`Press up/down arrow to continue`);
  }
  return 
};

// Export modules
module.exports = {
  viewAllEmployees,
  addEmployee,
  updateRole,
  viewDeptEmployees,
  deleteEmployee,
  deptBudget
};