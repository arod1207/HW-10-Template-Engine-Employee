const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// ARRAY STORING EMPLOYEE OBJECTS //
let employees = [];

// Console.log to display start of app //
console.log("Lets add some team members")

// STARTING THE NEW MANAGER FUNCTION //
newManager();

// NEW MANAGER FUNCTION //
function newManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
        validate: name => isNaN(name) ? true : "Please enter a valid name."
      },
      {
        type: "input",
        message: "What is your manager's ID?",
        name: "managerID",
        validate: number => !isNaN(number) ? true : "Please enter a valid ID number."
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
        validate: email => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ? true : "Please enter a valid e-mail address."
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
        validate: number => !isNaN(number) ? true : "Please enter a valid office number."
      },
    ])
    .then((answers) => {
      let manager = new Manager(
        answers.managerName,
        answers.managerID,
        answers.managerEmail,
        answers.officeNumber
      );
      employees.push(manager);
      addNewEmployee();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("There was an error wrting the file");
      }
    });
}

// NEW INTERN FUNCTION //
function newIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "internName",
        validate: name => isNaN(name) ? true : "Please enter a valid name."
      },
      {
        type: "input",
        message: "What is your intern's ID?",
        name: "internID",
        validate: number => !isNaN(number) ? true : "Please enter a valid ID number."
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "internEmail",
        validate: email => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ? true : "Please enter a valid e-mail address."

      },
      {
        type: "input",
        message: "What school did the intern go to?",
        name: "school",
      },
    ])
    .then((answers) => {
      let intern = new Intern(
        answers.internName,
        answers.internID,
        answers.internEmail,
        answers.school
      );
      employees.push(intern);
      addNewEmployee();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("There was an error wrting the file");
      }
    });
}

// NEW ENGINEER FUNCTION //
function newEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "engineerName",
        validate: name => isNaN(name) ? true : "Please enter a valid name."
      },
      {
        type: "input",
        message: "What is your engineer's ID?",
        name: "engineerID",
        validate: number => !isNaN(number) ? true : "Please enter a valid ID number."
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "engineerEmail",
        validate: email => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ? true : "Please enter a valid e-mail address."
      },
      {
        type: "input",
        message: "What is the engineer's github user name?",
        name: "githubName",
        validate: userName => userName.split(' ').length < 2 ? true : "Please enter a valid GitHub username."
      },
    ])
    .then((answers) => {
      let engineer = new Engineer(
        answers.engineerName,
        answers.engineerID,
        answers.engineerEmail,
        answers.githubName
      );
      employees.push(engineer);
      addNewEmployee();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("There was an error wrting the file");
      }
    });
}

// ADD NEW EMPLOYEE FUNCTION
function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add another team member?",
        name: "teamMember",
        choices: ["Engineer", "Intern", "I am done adding team members"],
      },
    ])
    .then((answers) => {
      if (answers.teamMember === "Engineer") {
        newEngineer();
      } else if (answers.teamMember === "Intern") {
        newIntern();
      } else {
        createHtmlFile();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("There was an error wrting the file");
      }
    });
}

// CREATE HTML FILE  FUNCTION//
function createHtmlFile() {
  let data = render(employees);
  fs.writeFile(outputPath, data, (err) => {
    if (err) throw err;
    console.log("HTML File Created");
  });
}
