const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createReviewsTable = `
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    game_id INT NOT NULL,
    platform_played_on VARCHAR(50) NOT NULL,
    rating INT NOT NULL,
    game_review TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createGamesTable = `
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    platforms VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    developer VARCHAR(100) NOT NULL,
    publisher VARCHAR(100) NOT NULL,
    multiplayer BOOLEAN NOT NULL,
    co_op BOOLEAN NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

client.query(createUsersTable, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Users table created successfully');
});

client.query(createReviewsTable, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Reviews table created successfully');
});

client.query(createGamesTable, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Games table created successfully');
});