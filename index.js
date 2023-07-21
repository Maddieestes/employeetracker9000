const inquirer = require('inquirer');
const {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
  } = require('./database');



mainMenu()
// Function to display the main menu
function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'option',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
          ],
        },
      ])
      .then((answers) => {
        switch (answers.option) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            promptAddDepartment();
            break;
          case 'Add a role':
            promptAddRole();
            break;
          case 'Add an employee':
            promptAddEmployee();
            break;
          case 'Update an employee role':
            promptUpdateEmployeeRole();
            break;
          case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
          default:
            console.log('Invalid option. Please try again.');
            mainMenu();
        }
      });
  }
  
  // Function to handle viewing all departments
  function viewAllDepartments() {
    getAllDepartments()
      .then((departments) => {
        console.log('\n========== All Departments ==========');
        console.table(departments);
        mainMenu();
      })
      .catch((error) => {
        console.error('Error retrieving departments:', error);
        mainMenu();
      });
  }
  
  // Function to handle viewing all roles
  function viewAllRoles() {
    getAllRoles()
      .then((roles) => {
        console.log('\n========== All Roles ==========');
        console.table(roles);
        mainMenu();
      })
      .catch((error) => {
        console.error('Error retrieving roles:', error);
        mainMenu();
      });
  }
  
  // Function to handle viewing all employees
  function viewAllEmployees() {
    getAllEmployees()
      .then((employees) => {
        console.log('\n========== All Employees ==========');
        console.table(employees);
        mainMenu();
      })
      .catch((error) => {
        console.error('Error retrieving employees:', error);
        mainMenu();
      });
  }
  
  // Function for adding a department
  function promptAddDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        },
      ])
      .then((answers) => {
        addDepartment(answers.name)
          .then(() => {
            console.log('Department added successfully!');
            mainMenu();
          })
          .catch((error) => {
            console.error('Error adding department:', error);
            mainMenu();
          });
      });
  }
  
  // Function to prompt for adding a role
  function promptAddRole() {
    getAllDepartments()
      .then((departments) => {
        const departmentChoices = departments.map((department) => ({
          name: department.name,
          value: department.id,
        }));
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: 'Enter the name of the role:',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'Enter the salary for the role:',
            },
            {
              type: 'list',
              name: 'department',
              message: 'Select the department for the role:',
              choices: departmentChoices,
            },
          ])
          .then((answers) => {
            addRole(answers.title, answers.salary, answers.department)
              .then(() => {
                console.log('Role added successfully!');
                mainMenu();
              })
              .catch((error) => {
                console.error('Error adding role:', error);
                mainMenu();
              });
          });
      })
      .catch((error) => {
        console.error('Error retrieving departments:', error);
        mainMenu();
      });
  }
  
  // Function for adding an employee
  function promptAddEmployee() {
    getAllRoles()
      .then((roles) => {
        const roleChoices = roles.map((role) => ({
          name: role.title,
          value: role.id,
        }));
  
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'firstName',
              message: 'Enter the first name of the employee:',
            },
            {
              type: 'input',
              name: 'lastName',
              message: 'Enter the last name of the employee:',
            },
            {
              type: 'list',
              name: 'role',
              message: 'Select the role for the employee:',
              choices: roleChoices,
            },
            {
              type: 'input',
              name: 'manager',
              message: "Enter the employee's manager:",
            },
          ])
          .then((answers) => {
            addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager )
              .then(() => {
                console.log('Employee added successfully!');
                mainMenu();
              })
              .catch((error) => {
                console.error('Error adding employee:', error);
                mainMenu();
              });
          });
      })
      .catch((error) => {
        console.error('Error retrieving roles:', error);
        mainMenu();
      });
  }
  
  // Function to update employee info
  function promptUpdateEmployeeRole() {
    getAllEmployees()
      .then((employees) => {
        const employeeChoices = employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
  
        getAllRoles()
          .then((roles) => {
            const roleChoices = roles.map((role) => ({
              name: role.title,
              value: role.id,
            }));
  
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'employee',
                  message: 'Select the employee to update:',
                  choices: employeeChoices,
                },
                {
                  type: 'list',
                  name: 'role',
                  message: 'Select the new role for the employee:',
                  choices: roleChoices,
                },
              ])
              .then((answers) => {
                updateEmployeeRole(answers.employee, answers.role)
                  .then(() => {
                    console.log('Employee role updated successfully!');
                    mainMenu();
                  })
                  .catch((error) => {
                    console.error('Error updating employee role:', error);
                    mainMenu();
                  });
              });
          })
          .catch((error) => {
            console.error('Error retrieving roles:', error);
            mainMenu();
          });
      })
      .catch((error) => {
        console.error('Error retrieving employees:', error);
        mainMenu();
      });
  }
  
  
    