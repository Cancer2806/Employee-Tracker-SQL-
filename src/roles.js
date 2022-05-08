// Define the required modules
const consoleTable = require('console.table')
const { viewAllDept,  } = require('./departments');

// Connect to Database
const { connect } = require("../db/connect");


// Create a new role
async function addRole(newRole, newSalary, dept) {
  // for future, look at catching error if title is already in database (unique field)

  const connection = await connect();
  // Determine the ID of the department to add to roles record
  const queryDeptId = `SELECT id FROM departments WHERE dept_name = "${dept}"`;
  const [deptID] = await connection.query(queryDeptId);
  // Query for inserting new record
  const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES ("${newRole}", ${newSalary}, ${deptID[0].id})`;
 
  return connection.execute(roleQuery);
}

// Read all roles
async function viewAllRoles() {
  const connection = await connect();
  // query to display all roles joined with departments and sorted by department name
  const query = `SELECT roles.id AS ID, title AS Title, department_id, departments.dept_name AS Department, salary AS Salary FROM roles LEFT JOIN departments ON departments.id = department_id ORDER BY departments.dept_name`;

  const [result] = await connection.query(query);
  if (result.length === 0) {
    console.log(`No roles found`);
  }
  return result;
}

// Future Update roles


// Future Delete a role
// Only permitted if role is not linked to an employee

// Export modules
module.exports = {
  viewAllRoles,
  addRole
};