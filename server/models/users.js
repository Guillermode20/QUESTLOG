const { Client } = require('pg');
const crypto = require('crypto');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '../.env');
console.log(`Loading .env file from: ${envPath}`);
const result = dotenv.config({ path: envPath });

// Check if .env file is loaded correctly
if (result.error) {
    console.error('Error loading .env file:', result.error);
    throw new Error('Failed to load .env file');
}

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();

const algorithm = 'aes-256-cbc';
if (!process.env.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not defined in the environment variables');
}
const key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

const addUser = async (user) => {
    const query = `
        INSERT INTO users (username, password, email, is_admin)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const encryptedEmail = encrypt(user.email);
    const values = [user.username, user.password, encryptedEmail, user.isAdmin || false];

    try {
        const res = await client.query(query, values);
        console.log('User added:', res.rows[0]);
    } catch (err) {
        console.error('Error adding user:', err);
    }
};

const getUserByUsername = async (username) => {
    const query = `
        SELECT * FROM users WHERE username = $1;
    `;
    const values = [username];

    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error fetching user by username:', err);
        return null;
    }
};

module.exports = { addUser, getUserByUsername };