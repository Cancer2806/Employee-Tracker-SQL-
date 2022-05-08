// Connect to Database
const { connect } = require("../db/connect");


// Create a new employee




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
  viewAllEmployees
};