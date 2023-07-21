const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '22Raptors!',
  database: 'employee_roster_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to execute a database query
function executeQuery(query, values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Function to retrieve all departments
function getAllDepartments() {
  const query = 'SELECT * FROM departments';
  return executeQuery(query);
}

// Function to retrieve all roles
function getAllRoles() {
  const query = `
    SELECT roles.*, departments.name AS department_name
    FROM roles
    JOIN departments ON roles.department_id = departments.id`;
  return executeQuery(query);
}

// Function to retrieve all employees
function getAllEmployees() {
  const query = `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
    departments.name AS department, roles.salary, manager.first_name as MFirst, Manager.last_name as Mlast
    FROM employees 
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id
    JOIN employees as manager ON manager.id = employees.manager_id
    `;

  return executeQuery(query);
}

// Function to add a department
function addDepartment(name) {
  const query = 'INSERT INTO departments (name) VALUES (?)';
  return executeQuery(query, [name]);
}

// Function to add a role
function addRole(title, salary, departmentId) {
  const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
  return executeQuery(query, [title, salary, departmentId]);
}

// Function to add an employee
function addEmployee(firstName, lastName, roleId, manager) {
  const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  return executeQuery(query, [firstName, lastName, roleId, manager]);
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, roleId) {
  const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
  return executeQuery(query, [roleId, employeeId]);
}

module.exports = {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};