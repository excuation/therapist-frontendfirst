import React, { useState, useEffect } from 'react';

// Importing images
import images1 from './images1.jpg'
import images2 from './images2.jpg';


const Advertisement = () => {
  const images = [images1, images2];

  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const changeImage = () => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
    };

    const intervalId = setInterval(changeImage, 2000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img
          src={currentImage}
          alt="Museum Exhibition"
          style={styles.image}
        />
      </div>
      <div style={styles.textSection}>
        <h2 style={styles.title}>Step into Health</h2>
        <p style={styles.subtitle}>Discover the Wonders of the Past</p>
        <p style={styles.description}>
          Explore the therpy's newest  and step into health with us.
        </p>
        <a href="/tickets" style={styles.button}>
          Get Your Appoitment
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#212529', // Dark background to make text stand out
   
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    maxWidth: '100%',
    
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  imageSection: {
    flex: 1,
    marginRight: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  textSection: {
    flex: 2,
    textAlign: 'left',
  },
  title: {
    fontSize: '2.5rem',
    color: '#FFFFFF', // White text color for the title
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.8rem',
    color: '#FFFFFF', // White text color for the subtitle
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1.1rem',
    color: '#FFFFFF', // White text color for the description
    marginBottom: '1.5rem',
    lineHeight: '1.7',
  },
  button: {
    display: 'inline-block',
    padding: '0.75rem 2rem',
    backgroundColor: '#1a73e8',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default Advertisement;
