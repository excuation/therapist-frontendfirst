import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import therpy1 from './therpy1.jpg'; // Adjust path as needed
import therpy2 from './therpy2.jpg'; // Adjust path as needed
import therpy3 from './therpy3.jpg'; // Adjust path as needed
import backgroundImage from './background.jpg'; // Path to the background image

const Cart = () => {
  const images = [therpy1, therpy2, therpy3];
  const [cardImages, setCardImages] = useState([]);

  useEffect(() => {
    const getRandomImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex];
    };

    const updateCardImages = () => {
      const newCardImages = Array.from({ length: 3 }, getRandomImage);
      setCardImages(newCardImages);
    };

    updateCardImages(); // Set initial images

    const intervalId = setInterval(updateCardImages, 3000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [images.length]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
        backgroundColor: '#FAEBEB', // Light background color for the container
        backgroundImage: `url(${backgroundImage})`, // Adding the background image
        backgroundSize: 'cover', // Cover the entire div with the background
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Ensure the background doesn't repeat
      }}
    >
      {cardImages.map((image, index) => (
        <div
          key={index}
          className="card"
          style={{
            width: '18rem',
            backgroundColor: 'black', // White background for the card
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Shadow for card
            border: '2px solid #007bff', // Blue border for the card
          }}
        >
          <img
            src={image}
            className="card-img-top"
            alt={`Card ${index + 1}`}
            style={{ height: '12rem', objectFit: 'cover' }}
          />
          <div className="card-body">
            <h5 className="card-title" style={{ color: 'white' }}>
               {"Theripest" + (index+1)}
            </h5>
            <p className="card-text" style={{ color: 'white' }}>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>

            <Link
              to="/information"
              className="btn btn-primary"
              style={{
                backgroundColor: '#1a73e8',
                borderColor: '#1a73e8',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#fff',
              }}
            >
               More-info..
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
