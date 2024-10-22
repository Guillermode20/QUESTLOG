const inquirer = require('inquirer').default;
const bcrypt = require('bcrypt');
const { addUser } = require('../models/users');

const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'Enter the username:',
        validate: (input) => input.length >= 3 || 'Username must be at least 3 characters long'
    },
    {
        type: 'password',
        name: 'password',
        message: 'Enter the password:',
        validate: (input) => input.length >= 6 || 'Password must be at least 6 characters long'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the email:',
        validate: (input) => /\S+@\S+\.\S+/.test(input) || 'Please enter a valid email address'
    },
    {
        type: 'confirm',
        name: 'isAdmin',
        message: 'Is this user an admin?',
        default: false
    }
];

inquirer.prompt(questions).then(async (answers) => {
    const { username, password, email, isAdmin } = answers;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await addUser({ username, password: hashedPassword, email, isAdmin });
        console.log('User added successfully');
    } catch (err) {
        console.error('Error adding user:', err);
    }
});