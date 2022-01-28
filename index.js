const inquirer = require('inquirer')
const fs = require('fs');
//Importing modules for generating employees.
const generateHtml = require('./util/generateHtml')
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

//New employees will be pushed into this array. When the user is finished creating employees, this array will be fed into the html generator.
const employees = [];

//Prompts begin here. Will take user input for team manager position. The team manager is then generated as an object using the Manager.js module, and then that object is pushed into the employees array.
const start = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "Welcome to team profile generator! You will be introduced to a series of prompts that will be used to generate your HTML file. To begin, please enter your team manager's name.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter your team manager's integer ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter your team manager's email.",
            name: 'email'
        },
        {
            type: 'input',
            message: "Lastly, please enter your team manager's office number.",
            name: 'officeNumber'
        },
    ])
    .then((response) => {
        const { name, id, email, officeNumber } = response;
        const manager = new Manager(name, id, email, officeNumber);
        employees.push(manager);
        console.log(employees);
        nextQuestion();
    })

}
//This function is called every time a new employee is created until the user decides their team is complete, at which point they can select "finish" and activate the html generator.
const nextQuestion = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Next, please choose to add an engineer or intern to your team roster.",
            choices: ["Add Engineer", "Add Intern", "Add Employee", "Finish"],
            name: 'choice'
        }
    ])
    .then((response)=> {
        switch (response.choice) {
            case 'Add Engineer':
                addEngineer();
                break;
            case 'Add Intern':
                addIntern();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            default:
                generate(employees);
        }
    })

}
//Function for adding a new engineer. Operates on the Engineer.js module.
const addEngineer = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "Please enter the name of your engineer.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter your engineer's integer ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter your engineer's email.",
            name: 'email'
        },
        {
            type: 'input',
            message: "Lastly, please enter your engineer's GitHub username.",
            name: 'github'
        },
    ])
    .then((response) => {
        const { name, id, email, github } = response;
        const engineer = new Engineer(name, id, email, github);
        employees.push(engineer);
        console.log(employees);
        nextQuestion();
    })

}
//Function for adding a new intern. Operates on the Intern.js module.
const addIntern = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "Please enter the name of your intern.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter your intern's integer ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter your intern's email.",
            name: 'email'
        },
        {
            type: 'input',
            message: "Lastly, please enter your the name of your intern's school.",
            name: 'school'
        },
    ])
    .then((response) => {
        const { name, id, email, school } = response;
        const intern = new Intern(name, id, email, school);
        employees.push(intern);
        console.log(employees);
        nextQuestion();
    })
}

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "Please enter the name of your employee.",
            name: 'name'
        },
        {
            type: 'input',
            message: "Please enter your employee's integer ID.",
            name: 'id'
        },
        {
            type: 'input',
            message: "Please enter your employee's email.",
            name: 'email'
        }
    ])
    .then((response) => {
        const { name, id, email } = response;
        const employee = new Employee(name, id, email);
        employees.push(employee);
        console.log(employees);
        nextQuestion();
    })

}

//Initialize.
start();

//This is the html generator function. It will create a new html file named after the team manager. It takes the employees array and all of its generated contents and then pushes that through to the generateHtml.js module in the util folder.
function generate(employees) {
    fs.writeFile(`${employees[0].name}s-team.html`, generateHtml(employees), (err)=> 
    err ? console.error(err) : console.log('Responses logged!'));
}

//use inquirer to take in user input on employees
//on start, user is prompted to enter TEAM MANAGER's name, employee id, email, and office number.
//After team manager has been made, an option to add an engineer or intern or finish is presented. 
//When ENGINEER is selected, the user is prompted to enter the name, id, email, and github username, and then is returned to the original menu of choices.
//when INTERN is selected, then the user is prompted to enter the intern's name, id, email, school and then is taken back to the original menu.
//when FINISH is selected, then the loop is ended and the HTML is generated.