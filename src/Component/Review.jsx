import React, { useState } from 'react';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText && rating > 0) {
      const newReview = { text: reviewText, rating: rating };
      setReviews([...reviews, newReview]);
      setReviewText('');
      setRating(0);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleReviewSubmit} style={styles.form}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here"
          style={styles.textarea}
        />
        <div style={styles.starRating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={index < rating ? styles.filledStar : styles.emptyStar}
              onClick={() => setRating(index + 1)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <button type="submit" style={styles.button}>
          Submit Review
        </button>
      </form>
      <div style={styles.reviewsList}>
        {reviews.map((review, index) => (
          <div key={index} style={styles.review}>
            <p style={styles.reviewText}>{review.text}</p>
            <div style={styles.starRating}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={i < review.rating ? styles.filledStar : styles.emptyStar}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#212529',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '100%',
    margin: '0 auto',
  },
  form: {
    marginBottom: '2rem',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '1rem',
  },
  starRating: {
    display: 'flex',
    marginBottom: '1rem',
  },
  filledStar: {
    color: '#ffd700',
    cursor: 'pointer',
    fontSize: '2rem',
  },
  emptyStar: {
    color: '#ccc',
    cursor: 'pointer',
    fontSize: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a73e8',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  reviewsList: {
    marginTop: '2rem',
  },
  review: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
  },
  reviewText: {
    marginBottom: '0.5rem',
  },
};

export default Review;
