// Define the required modules

// Connect to Database
const { connect } = require("../db/connect");

// Create a new role
async function addRole(newRole, newSalary, dept) {
  // only permitted if the role is not already in the database

  const connection = await connect();
  // Determine the ID of the department to add to roles record
  const queryDeptId = `SELECT id FROM departments WHERE dept_name = "${dept}"`;
  const [deptID] = await connection.query(queryDeptId);
  // Query for inserting new record
  const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES ("${newRole}", ${newSalary}, ${deptID[0].id})`;
 
  return connection.execute(roleQuery)
    .then(() => {
      console.log(`\n ${newRole} successfully added`);
    })
    .catch((err) => {
      console.log(`\n ${newRole} already exists`);
    })
}
// 'Read' all roles
async function viewAllRoles() {
  const connection = await connect();
  // query to display all roles joined with departments and sorted by department name
  const query = `SELECT roles.id AS ID, title AS Title, department_id, departments.dept_name AS Department, salary AS Salary FROM roles LEFT JOIN departments ON departments.id = department_id ORDER BY roles.title`;

  const [result] = await connection.query(query);
  if (result.length === 0) {
    console.log(`\n No roles found`);
  }
  return result;
}


// Delete a role
// Only permitted if there are no employees with the role - enforced by Delete No Action
async function deleteRole(role) {
  const query = `DELETE FROM roles WHERE title = "${role}"`;

  const connection = await connect();

  return connection.execute(query)
    .then(() => {
      console.log(`\n Deletion of ${role} was successful`);
    })
    .catch(() => {
      console.log(`\n Cannot delete ${role} if there are employees in that role`);
    })
}


// Export modules
module.exports = {
  viewAllRoles,
  addRole,
  deleteRole
};