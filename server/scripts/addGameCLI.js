const inquirer = require('inquirer').default;
const { addGame } = require('../models/games');

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the game title:',
    },
    {
        type: 'input',
        name: 'platforms',
        message: 'Enter the platforms (comma-separated):',
    },
    {
        type: 'input',
        name: 'genre',
        message: 'Enter the genre:',
    },
    {
        type: 'input',
        name: 'release_date',
        message: 'Enter the release date (YYYY-MM-DD):',
    },
    {
        type: 'input',
        name: 'developer',
        message: 'Enter the developer:',
    },
    {
        type: 'input',
        name: 'publisher',
        message: 'Enter the publisher:',
    },
    {
        type: 'confirm',
        name: 'multiplayer',
        message: 'Does the game support multiplayer?',
    },
    {
        type: 'confirm',
        name: 'co_op',
        message: 'Does the game support co-op?',
    },
    {
        type: 'input',
        name: 'image_url',
        message: 'Enter the image URL:',
    },
];

inquirer.prompt(questions).then(async (answers) => {
    try {
        await addGame(answers);
        console.log('Game added successfully');
    } catch (err) {
        console.error('Error adding game:', err);
    }
});