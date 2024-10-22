const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { addUser } = require('../models/users');
const app = express();
const port = 3000;
require('dotenv').config({ path: '../.env' });

app.use(express.json());

app.post('/api/users', [
    body('username').isLength({ min: 3 }).trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('isAdmin').isBoolean().optional()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await addUser({ username, password: hashedPassword, email, isAdmin });
        res.send({ message: 'User added successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Error adding user' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});