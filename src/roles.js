// Connect to Database
const { connect } = require("../db/connect");

// CRUD
// Create a new role




// Read all roles
async function viewAllRoles() {
  // console.log(`Here I am`);
  const connection = await connect();
  // query to display all roles joined with departments and sorted by department name
  const query = `SELECT roles.id AS ID, title AS Title, departments.dept_name AS Department, salary AS Salary FROM roles JOIN departments ON departments.id = roles.id ORDER BY departments.dept_name`;

  const [result] = await connection.query(query);
  if (result.length === 0) {
    console.log(`No roles found`);
  }
  // console.table(display);
  return result;
}


// Update roles



// Delete a role
// Only permitted if role is not linked to an employee


// Export modules
module.exports = {
  viewAllRoles
};