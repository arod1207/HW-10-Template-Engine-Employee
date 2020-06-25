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

function newManager(){
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
    {
      type: "input",
      message: "Would you like to add another team member?",
      name: "teamMember",
      choices: ["Engineer", "Intern", "I am done adding team members"]
    }
  ])
  .then((answers) => {
    if(answers.teamMember === "Engineer"){
      newEngineer();
    } else if (answers.teamMember === "Intern"){
      newIntern();
    } else {
    let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
    employees.push(manager);
    let data = render(employees);
    fs.writeFile(outputPath, data, (err) => {
      if (err) throw err;
      console.log("HTML File Created");
    });
  }
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
      message: "What is your engineer's github user name?",
      name: "githubUserName",
    },
  ])
  .then((answers) => {
    let manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
    let engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.githubUserName)
    employees.push(manager);
    employees.push(engineer)
    let data = render(employees);
    fs.writeFile(outputPath, data, (err) => {
      if (err) throw err;
      console.log("HTML File Created");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('There was an error wrting the file')
    }
  });
  }

  newManager();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
