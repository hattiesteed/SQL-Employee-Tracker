const connection = require('./connection.js');
const { prompt } = require('inquirer');
const db = require('./db/index.js');
const cTable = require('console.table');

questions()
function questions() {
    prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'Please select an option:',
            choices: [
                {
                    name: 'View All Departments',
                    value: 'viewAllRoles'
                },
                {
                    name: 'View All Roles',
                    value: 'viewAllRoles'
                },
                {
                    name: 'View All Employees',
                    value: 'viewAllEmployees',
                },
                {
                    name: 'Add Department',
                    value: 'addDepartment'
                },
                {
                    name: 'Add Role',
                    value: 'addrole'
                },
                {
                    name: 'Add Employee',
                    value: 'addEmployee'
                },
                {
                    name: 'Update Employee Role',
                    value: 'updateEmployeeRole'
                },
                {
                    name: 'Exit',
                    value: 'exit'
                }
            ]
        }
    ])

        .then((answers) => {
            console.log(answers);
            let choices = answers.choices;
            switch (choices) {
                case 'viewAllDepartments':
                    db.viewAllDepartments().then((res) => {
                        console.table(res[0])
                        questions();
                    });

                    break;
                case 'viewAllRoles':
                    db.viewAllRoles().then((res) => {
                        console.table(res[0]);
                        questions();
                    });

                    break;
                case 'viewAllEmployees':
                    db.viewAllEmployees().then((res) => {
                        console.table(res[0]);
                        questions();
                    });

                    break;
                // if add department, call the add department meothd and prompt the user for the department name
                case 'addDepartment':
                    addDepartment();
                    break;

                // if choice is add employee, call the add employee method
                case 'addRole':
                    addRole();
                    break;

                case 'addEmployee':
                    addEmployee();
                    break;
                 
                case 'updateEmployeeRole':
                    updateEmployeeRole();
                    break;
                // if choice is exit then exit the application
                case 'exit':
                    console.log('Bye.');
                    conncection.end();
                    break;
            }
        })
};

// Funct for adding employee, role, and department
// function to add a department
function addDepartment() {
    prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What department do you want to add?'
        }
    ])
        .then((res) => {
            let DEPARTMENT = res;
            db.addDepartment(DEPARTMENT).then(() => {
                console.log ('Department added to database.');
                console.table(DEPARTMENT);
                questions();
            });
        })
}

// function to add role
