const inquirer = require('inquirer')
const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const employees = [];

//Prompts begin here. Will take user input for team manager position.
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
        const manager = new Manager(response);
        employees.push(manager);
        console.log(employees);
        nextQuestion();
    })

}

const nextQuestion = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: "Next, please choose to add an engineer or intern to your team roster.",
            choices: ["Add Engineer", "Add Intern"],
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
            default:
                console.log("???");
        }
    })

}

const addEngineer = () => {
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

}



start();

//use inquirer to take in user input on employees
//on start, user is prompted to enter TEAM MANAGER's name, employee id, email, and office number.
//After team manager has been made, an option to add an engineer or intern or finish is presented. 
//When ENGINEER is selected, the user is prompted to enter the name, id, email, and github username, and then is returned to the original menu of choices.
//when INTERN is selected, then the user is prompted to enter the intern's name, id, email, school and then is taken back to the original menu.
//when FINISH is selected, then the loop is ended and the HTML is generated.