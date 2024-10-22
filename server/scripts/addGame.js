const express = require('express');
const { addGame } = require('./models/games');
const app = express();
const port = 3000;
require('dotenv').config({ path: '../models/.env' });

app.use(express.json());

app.post('/api/games', async (req, res) => {
    const game = req.body;
    try {
        await addGame(game);
        res.send({ message: 'Game added successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Error adding game' });
    }
});