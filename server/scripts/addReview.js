const express = require('express');
const { addReview, getReviewById } = require('../models/reviews');
const router = express.Router();
require('dotenv').config({ path: '../.env' });

router.use(express.json());

router.post('/api/reviews/', async (req, res) => {
    const review = req.body;
    try {
        await addReview(review);
        res.send({ message: 'Review added successfully' });
    } catch (err) {
        res.status(500).send({ error: 'Error adding review' });
    }
});

router.get('/api/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await getReviewById(id);
        if (review) {
            res.send(review);
        } else {
            res.status(404).send({ error: 'Review not found' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Error fetching review' });
    }
});

module.exports = router;