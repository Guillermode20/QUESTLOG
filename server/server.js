const express = require('express');
const jwt = require('jsonwebtoken')
const { authenticate } = require('./utils/loginAuth');
const { authenticateToken } = require('./utils/jwtMiddleware');
const reviewRoutes = require('./scripts/addReview');
const app = express();
const port = 3000;

app.use(express.json());

require('dotenv').config();

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await authenticate(username, password);
    if (user) {
        const token = jwt.sign({ user: user.username }, process.env.JWT_SECRET);
        res.json({ success: true, user: { username: user.username, name: user.name }, token });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/api/verify-token', authenticateToken, (req, res) => {
    res.json({ success: true, user: { username: req.user.user } });
});

app.use(reviewRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});