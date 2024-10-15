import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import { useParams } from 'react-router-dom'; // To get the appointment ID from the URL

const Tickets = () => {
  const { id } = useParams(); // Assuming the ID is passed through the URL
  console.log("Fetched ID from URL:", id);
  const [ticketData, setTicketData] = useState({
    service: '',
    date: '',
    time: '',
    therapist: '',
  });

  useEffect(() => {
    // Fetch the appointment data from the backend
    const fetchTicketData = async () => {
      try {
        const response = await axios.get(`https://therapist-backend5.onrender.com/api/get-ticket/${id}`);
        // Updated URL
        setTicketData(response.data);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTicketData();
  }, [id]);

  return (
    <div
      style={{
        width: '40%',
        margin: '20px auto',
        padding: '20px',
        border: '2px solid #28a745',
        borderRadius: '10px',
        backgroundColor: 'black',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        height: '400px',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#28a745', marginBottom: '20px' }}>
        Appointment
      </h2>

      <div style={{ marginBottom: '15px' }}>
        <strong>Service:</strong> <span>{ticketData.service}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Date:</strong> <span>{new Date(ticketData.date).toLocaleDateString()}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Time:</strong> <span>{new Date(ticketData.time).toLocaleTimeString()}</span>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Therapist:</strong> <span>{ticketData.therapist}</span>
      </div>

      <p style={{ textAlign: 'center', marginTop: '15px', color: '#6c757d' }}>
        Present this ticket for your therapy session.
      </p>
    </div>
  );
};

export default Tickets;
