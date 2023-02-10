const inquirer = require("inquirer");
const fs = require("fs");

let questions = [
    {
        type: "input",
        name: "title",
        message: "Enter the title of your project"
    },
    {
        type: "input",
        name: "description",
        message: "Enter the description of your project"
    },
    {
        type: "input",
        name: "table",
        message: "Enter your table of contents (seperate by commas)"
    },
    {
        type: "input",
        name: "installation",
        message: "Enter how the user can install your project"
    },
    {
        type: "input",
        name: "usage",
        message: "Enter how the user can utilize your project"
    },
    {
        type: "list",
        name: "hasContributing",
        message: "Do you want to include contribution guidelines?",
        choices: [
            {
                name: "Yes",
                value: true
            },
            {
                name: "No",
                value: false
            }
        ]
    },
    {
      name: "input",
      name: "contributing",
      message: "Enter your contribution guidelines: ",
      when: answers => answers.hasContributing  
    },
    {
        type: "input",
        name: "tests",
        message: "Enter test instructions: "
    },
    {
        type: "input",
        name: "github",
        message: "Enter your GitHub username: "
    },
    {
        type: "input",
        name: "license",
        message: "What license are you using for your project?",
        choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "None"]
    }
] // questions