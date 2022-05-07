// Connect to Database
const { connect } = require("../db/connect");

// CRUD
// Create a new department




// Read all departments
async function viewAllDept() {
  // console.log(`Here I am`);
  const connection = await connect();
  const query = "SELECT id AS ID, dept_name AS Department FROM departments ORDER BY dept_name";

  const [display] = await connection.query(query);
  if (display.length === 0) {
    console.log(`No departments found`);
  }
  // console.table(display);
  return display;
}


// Update department



// Delete a department
// Only permitted if department is not linked to a role


// Export modules
module.exports = {
  viewAllDept
};