import React, { useState, useEffect } from 'react';

const LogPage = ({ id }) => {
    const [review, setReview] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            console.log(`Fetching review for id: ${id}`);
            try {
                const response = await fetch(`/api/reviews/${id}`);
                console.log(`Response status: ${response.status}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Review data:', data);
                    setReview(data);
                } else {
                    console.error('Failed to fetch review');
                    setError('Failed to fetch review');
                }
            } catch (error) {
                console.error('Error fetching review:', error);
                setError('Error fetching review');
            }
        };

        fetchReview();
    }, [id]);

    return (
        <div>
            {error && <p>{error}</p>}
            {review ? (
                <div>
                    <h1>User:{review.user_id}</h1>
                    <h2>Game:{review.game_id}</h2>
                    <h3>Rating:{review.rating}</h3>
                    <p>Platform:{review.platform_played_on}</p>
                    <p>Review:{review.game_review}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LogPage;