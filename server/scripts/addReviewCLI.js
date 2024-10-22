const { addReview } = require('../models/reviews');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const main = async () => {
    try {
        const user_id = await askQuestion('Enter user ID: ');
        const game_id = await askQuestion('Enter game ID: ');
        const platform_played_on = await askQuestion('Enter platform played on: ');
        const rating = await askQuestion('Enter rating: ');
        const game_review = await askQuestion('Enter game review: ');

        const review = {
            user_id,
            game_id,
            platform_played_on,
            rating,
            game_review
        };

        await addReview(review);
        console.log('Review added successfully');
    } catch (err) {
        console.error('Error adding review:', err);
    } finally {
        rl.close();
    }
};

main();