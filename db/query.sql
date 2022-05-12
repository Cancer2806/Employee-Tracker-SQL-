-- file used for testing queries --
SELECT e.id as 'id', e.first_name, e.last_name, roles.title, departments.dept_name AS department, roles.salary AS salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name),'Manager') as 'manager'
FROM employees e
JOIN roles
ON roles.id = e.role_id
JOIN departments
ON departments.id = roles.department_id
LEFT JOIN employees m 
ON m.id = e.manager_id
ORDER BY departments.dept_name
