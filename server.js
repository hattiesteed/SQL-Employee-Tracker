const connection = require('./connection.js');
const { prompt } = require('inquirer');
const db = require('./db/index.js');
const cTable = require('console.table');

questions()
function questions() {
prompt([
    {
    name: 'choices',
    type: 'list',
    message: 'Please select an option:',
    choices: [
{
    name: 'View All Departments',
    value: 'viewAllDepartments'
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
    value: 'addRole'
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
}]
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
})

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
    connection.end();
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
function addRole() {
    prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the title of the role you want to add?'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Salary for this role'
        },
        {
            name: 'DEPARTMENT_ID',
            type: 'input',
            message: 'What is the department ID for this role?'
        },
    ])
    .then((res) => {
        let role = res;
        db.addRole(role).then(() => {
            console.table(role);
            questions();
        });
    })
}

function addEmployee () {
    prompt([
        {
            name: 'FIRST_NAME',
            type: 'input',
            message: 'What is the first name of the employee?'
        },
        {
            name: 'LAST_NAME',
            type: 'input',
            message: 'What is the last name of the employee?'
        },
        {
            name: 'ROLE_ID',
            type: 'input',
            message: 'What is the role ID for this employee?'
        },
        {
            name: 'MANAGER_ID',
            type: 'input',
            message: 'What is the manager ID for this employee?'
        }
    ])
        .then((res) => {
            let employee = res;
            db.addEmployee(employee).then(() => {
                console.table(employee);
                questions();
            });
        })
}

function updateEmployeeRole() {
    prompt ([
        {
            name: 'ID',
            type: 'input',
            message: 'What is the ID of the employee you want to update?'
        },
        {
            name: 'ROLE_ID',
            type: 'input',
            message: 'What is the new role ID for this employee?'
        }
    ])
    .then((res) => {
        let employee = res;
        db.updateEmployeeRole(employee.ID, employee.ROLE_ID).then (() => {
            console.table(employee);
            questions();
        });
    })
}