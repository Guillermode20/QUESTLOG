// games database format
// id SERIAL PRIMARY KEY,
// title VARCHAR(100) UNIQUE NOT NULL,
// platforms VARCHAR(100) NOT NULL,
// genre VARCHAR(50) NOT NULL,
// release_date DATE NOT NULL,
// developer VARCHAR(100) NOT NULL,
// publisher VARCHAR(100) NOT NULL,
// multiplayer BOOLEAN NOT NULL,
// co_op BOOLEAN NOT NULL,
// image_url TEXT NOT NULL,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

const { Client } = require('pg');
require('dotenv').config({ path: '../.env' });

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

const addGame = async (game) => {
    const query = `
        INSERT INTO games (title, platforms, genre, release_date, developer, publisher, multiplayer, co_op, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `;
    const values = [
        game.title,
        game.platforms,
        game.genre,
        game.release_date,
        game.developer,
        game.publisher,
        game.multiplayer,
        game.co_op,
        game.image_url
    ];

    try {
        const res = await client.query(query, values);
        console.log('Game added:', res.rows[0]);
    } catch (err) {
        console.error('Error adding game:', err);
    }
};

module.exports = { addGame };
