import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa'; // Import an icon (e.g., calendar)

const Theripest = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query'); // Get the search query

  useEffect(() => {
    if (query) {
      setLoading(true); // Ensure loading state is true before fetch starts
      fetch(`https://therapist-backend5.onrender.com/api/search?query=${query}`, { method: 'GET', cache: 'no-store' })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok"); // Handle network errors
          }
          return response.json();
        })
        .then(data => {
          console.log("Search results:", data);
          setSearchResults(data); // Set the fetched search results
        })
        .catch(error => {
          console.error("Error fetching search results:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading after fetch (even on error)
        });
    } else {
      setLoading(false); // If no query, stop loading immediately
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: 'black', padding: '20px', color: 'white' }}>
      {searchResults.length > 0 ? (
        searchResults.map(item => (
          <div key={item._id} style={{ marginBottom: '20px' }}>
            <h3>{item.doctorDetails.name}</h3>
            <p>Specialization: {item.doctorDetails.specialization}</p>
            <p>Experience: {item.doctorDetails.experience} years</p>
            <p>{item.description}</p>
            {/* Add Book Appointment Button with Icon */}
            <button
              onClick={() => navigate(`/book-appointment/${item._id}`)}
              style={{
                backgroundColor: 'blue',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FaCalendarAlt style={{ marginRight: '5px' }} /> {/* Icon */}
              Book Appointment
            </button>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Theripest;
