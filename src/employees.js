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

  return connection.execute(addQuery);
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


// Update an employees record



// Future Delete an employee



// Export modules
module.exports = {
  viewAllEmployees,
  addEmployee
};