// Connect to Database
const { connect } = require("../db/connect");

// Create a new department
async function addDept(newDept) {
  // for future, look at catching error if name is already in database (unique field)

  const connection = await connect();
  const query = `INSERT INTO departments (dept_name) VALUES ("${newDept}")`;
  
  return connection.execute(query);
}



// Read all departments
async function viewAllDept() {
  const connection = await connect();
  const query = `SELECT id AS ID, dept_name AS Department FROM departments ORDER BY dept_name`;

  const [display] = await connection.query(query);
  if (display.length === 0) {
    return console.log(`No departments found`);
  }
  return display;
}


// Future Update department name


// Future Delete a department
  // Only permitted if department is not linked to a role


// Export modules
module.exports = {
  viewAllDept,
  addDept
};