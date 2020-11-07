const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
.prompt({
  message: 'What is you GitHub user name?',
  name: 'username'
})
.prompt({
  message: 'What is your email address?',
  address: 'address'
})
.then.prompt({
  message: 'What is your project name?',
  project: 'project'
})
.prompt({
  message: 'Please write a short description of your last project?',
  description: 'description'
})
.prompt({
  message: 'What kind of Licence should your project have?',
  licence: 'licence'
})
.prompt({
  message: 'What command should be run to instal dependencies?',
  depend: 'dependencies'
})
.prompt({
  message: 'What command should be run to run tests?',
  tests: 'tests'
})
.prompt({
  message: 'What does the user need to know about using the repo?',
  using: 'using'
})
.prompt({
  message: 'What does the user need to know about contributing to the repo?',
  contributing: 'contributing'
})
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("README.md", repoNames, function(err) {
        if (err) {
          throw err;
        }
    
        console.log("Successfully wrote to dogs.json file");
      });

    });
  });
