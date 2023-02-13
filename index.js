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
        type: "input",
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
        name: "email",
        message: "Enter your email address: "
    },
    {
        type: "list",
        name: "license",
        message: "Choose a license for your application:",
        choices: [
            "MIT",
            "Apache License 2.0",
            "BSD 2-Clause 'Simplified' License",
            "BSD 3-Clause 'New' or 'Revised' License"
        ]
    },
    {
        type: "input",
        name: "table",
        message: "Enter your table of contents (separate by commas) (optional)"
    }
] // questions

let licenseBadges = {
    'MIT': '<li class="badge-list-item"><a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a></li>',
    'Apache 2.0': '<li class="badge-list-item"><a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/license-Apache%202.0-blue.svg" alt="Apache 2.0 License"></a></li>',
    'BSD 2-Clause': '<li class="badge-list-item"><a href="https://opensource.org/licenses/BSD-2-Clause"><img src="https://img.shields.io/badge/license-BSD%202--Clause-blue.svg" alt="BSD 2-Clause License"></a></li>',
    'BSD 3-Clause': '<li class="badge-list-item"><a href="https://opensource.org/licenses/BSD-3-Clause"><img src="https://img.shields.io/badge/license-BSD%203--Clause-blue.svg" alt="BSD 3-Clause License"></a></li>',
};

// generateReadme
inquirer.prompt(questions).then(answers => {
    let licenseBadge = licenseBadges[answers.license];
    let tableOfContents = '';
    if (answers.table) {
        let table = answers.table.split(",");
        tableOfContents = `## Table of Contents\n`;
        table.forEach(item => {
            let anchor = item.trim().toLowerCase().replace(/ /g, "-");
            tableOfContents += `* [${item.trim()}](#${anchor})\n`;
        });
    }

    let contributingSection = '';
    if (answers.hasContributing) {
        contributingSection = `<a name="contributing"></a>
## Contributing
  ${answers.contributing}`;
    }

    let readme = `# ${answers.title}
    ${licenseBadge}
<a name="description"></a>
## Description
${answers.description}
${tableOfContents}
<a name="installation"></a>
## Installation
${answers.installation}
  
<a name="usage"></a>
## Usage
${answers.usage}
${contributingSection}
  
<a name="tests"></a>
## Tests
${answers.tests}
  
<a name="license"></a>
## License
This project is licensed under the ${answers.license} license.

<a name="questions"></a>
## Questions
If you have any questions about the repository, open an issue or contact me directly at [${answers.github}](https://github.com/${answers.github}) or by email at [${answers.email}](mailto:${answers.email}).`

    fs.writeFile("README.md", readme, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("README.md file created successfully");
    });

}); // inquirer

