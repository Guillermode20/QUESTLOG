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

const addReview = async (review) => {
    const query = `
        INSERT INTO reviews (user_id, game_id, platform_played_on, rating, game_review)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const values = [
        review.user_id,
        review.game_id,
        review.platform_played_on,
        review.rating,
        review.game_review
    ];

    try {
        const res = await client.query(query, values);
        console.log('Review added:', res.rows[0]);
    } catch (err) {
        console.error('Error adding review:', err);
    }
};

const getReviewById = async (id) => {
    const query = `SELECT * FROM reviews WHERE id = $1;`;
    const values = [id];

    try {
        const res = await client.query(query, values);
        return res.rows[0];
    } catch (err) {
        console.error('Error getting review:', err);
    }
};

module.exports = { addReview, getReviewById };