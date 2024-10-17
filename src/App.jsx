import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Cart from './Component/Cart';
import Advertisement from './Component/Advertisement';
import Review from './Component/Review';
import Information from './Component/Information';
import Login from './Buttons/Login';
import Signup from './Buttons/Signup';
import Help from './Buttons/Help';
import Chatboard from './Component/Chatboard';
import History from './Buttons/History';
import Signout from './Buttons/Signout';
import Profile from './Buttons/Profile';
import Tickets from './Buttons/Tickets';
import Explore from './Buttons/Explore'; 
import Theripest from './Component/Theripest';
import BookAppointment from './Component/BookAppointment';
import ContactUs from './Buttons/ContactUs'; // Importing ContactUs

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    // Check if user is authenticated (e.g., by checking a token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is logged in
      // Optionally, fetch the user's profile picture if stored somewhere
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsAuthenticated(false); // Set user as logged out
    setProfilePicture(null); // Clear profile picture
  };

  return (
    <Router>
      <Header 
        isAuthenticated={isAuthenticated} 
        profilePicture={profilePicture} 
        onLogout={handleLogout} 
      />
      <Routes>
        <Route path="/" element={<><Cart /><Advertisement /><Review /></>} />
        <Route path="/information" element={<Information />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />
        <Route path="/history" element={<History />} />
        <Route 
          path="/signout" 
          element={<Signout onSignOut={handleLogout} />} 
        />
        <Route 
          path="/profile" 
          element={<Profile setProfilePicture={setProfilePicture} />} 
        />
        <Route path="/tickets" element={<Tickets />} />
       

        <Route path="/services" element={<Explore />} />
        <Route path="/theripest" element={<Theripest />} />
        <Route path="/book-appointment/:id" element={<BookAppointment />} />
        {/* Add the new route for Contact Us */}
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Chatboard />
      <Footer />
    </Router>
  );
}

export default App;
