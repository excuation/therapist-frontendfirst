import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signout = ({ onSignOut }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('token');

    // Call the prop function to clear profile picture in App component
    onSignOut();

    // Redirect to the login page after signout
    navigate('/login');
  }, [navigate, onSignOut]);

  return (
    <div>
      <h2>Sign Out</h2>
      <p>You have successfully signed out.</p>
    </div>
  );
};

export default Signout;