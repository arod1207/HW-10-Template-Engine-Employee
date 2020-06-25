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

let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// inquirer
//   .prompt([
//     {
//       type: "input",
//       message: "What is your manager's name?",
//       name: "managerName",
//     },
//     {
//       type: "input",
//       message: "What is your manager's ID?",
//       name: "managerID",
//     },
//     {
//       type: "input",
//       message: "What is your manager's email?",
//       name: "managerEmail",
//     },
//     {
//       type: "input",
//       message: "What is your manager's office number?",
//       name: "officeNumber",
//     },
//     {
//       type: "list",
//       message: "Would type of team memver would yo like to add?",
//       choices: ["Engineer", "Intern", "I dont want to add anymore team members"],
//       name: 'teamMembers',
//       when: function(answers) {
//         if(answers.teamMembers === "Engineer") {}
//       }
//     },
//     {
//       type: "input",
//       message: "What is your engineer's name?",
//       name: "engineersName",
//     },
//     {
//       type: "input",
//       message: "What is your engineer's ID?",
//       name: "engineersID",
//     },
//     {
//       type: "input",
//       message: "What is your engineer's email?",
//       name: "engineersEmail",
//     },
//     {
//       type: "input",
//       message: "What is your engineer's github user name?",
//       name: "githubUserName",
//     },
//   ])
//   .then((answers) => {
//     let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
//     let engineer = new Engineer(answers.engineersName, answers.engineersID, answers.engineersEmail, answers.githubUserName)
//     employees.push(manager);
//     employees.push(engineer)
//     let data = render(employees);
//     fs.writeFile(outputPath, data, (err) => {
//       if (err) throw err;
//       console.log("HTML File Created");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log('There was an error wrting the file')
//     }
//   });

function newManager() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
      },
      {
        type: "input",
        message: "What is your manager's ID?",
        name: "managerID",
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNumber",
      },
      // {
      //   type: "list",
      //   message: "Would you like to add another team member?",
      //   name: "teamMember",
      //   choices: ["Engineer", "Intern", "I am done adding team members"],
      // },
    ])
    .then((answers) => {
      addNewEmployee()
      if (answers.teamMember === "Engineer") {
        newEngineer();
        let manager = new Manager(answers.managerName ,answers.managerID ,answers.managerEmail ,answers.officeNumber);
        employees.push(manager);
        addNewEmployee();
      } else if (answers.teamMember === "Intern") {
        newIntern();
        let manager = new Manager(answers.managerName ,answers.managerID ,answers.managerEmail ,answers.officeNumber);
        employees.push(manager);
        addNewEmployee();
      } else {
        let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
        employees.push(manager);
        let data = render(employees);
        fs.writeFile(outputPath, data, (err) => {
          if (err) throw err;
          console.log("All Team Members Added")
          console.log("HTML File Created");
        });
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("There was an error wrting the file");
      }
    });
}

function newIntern(){
  inquirer
.prompt([
  {
    type: "input",
    message: "What is your intern's name?",
    name: "internName",
  },
  {
    type: "input",
    message: "What is your intern's ID?",
    name: "internID",
  },
  {
    type: "input",
    message: "What is your intern's email?",
    name: "internEmail",
  },
  {
    type: "input",
    message: "What school did the intern go to?",
    name: "school",
  },
])
.then((answers) => {
  let intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.school)
  employees.push(intern)
})
.catch((error) => {
  if (error.isTtyError) {
    console.log('There was an error wrting the file')
  }
});
}

function newEngineer(){
  inquirer
.prompt([
  {
    type: "input",
    message: "What is your engineer's name?",
    name: "engineerName",
  },
  {
    type: "input",
    message: "What is your engineer's ID?",
    name: "engineerID",
  },
  {
    type: "input",
    message: "What is your engineer's email?",
    name: "engineerEmail",
  },
  {
    type: "input",
    message: "What is the engineer's github user name?",
    name: "githubName",
  },
])
.then((answers) => {
  let engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.githubName)
  employees.push(engineer)
})
.catch((error) => {
  if (error.isTtyError) {
    console.log('There was an error wrting the file')
  }
});
}

newManager();

function addNewEmployee(){
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
          console.log("All Team Members Added")
          console.log("HTML File Created");
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log('There was an error wrting the file')
      }
    });
}
