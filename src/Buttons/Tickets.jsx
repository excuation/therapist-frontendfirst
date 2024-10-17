import React, { useEffect, useState } from 'react';

const Tickets = () => {
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('appointmentData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const appointmentDate = new Date(parsedData.date);

      // Compare the appointment date with the current date
      const currentDate = new Date();

      if (appointmentDate >= currentDate) {
        setAppointmentData(parsedData); // Set data if appointment date is today or in the future
      }
    }
  }, []);

  if (!appointmentData) {
    return <p style={{ color: '#fff', textAlign: 'center' }}>No appointment data available.</p>;
  }

  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      width: '80%',
      margin: '2rem auto',
      boxShadow: '0 0px 16px rgba(0, 0, 0, 0.3)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center' }}>🗓️ Appointment Details</h2>
      <p><strong>Service:</strong> 💼 {appointmentData.service}</p>
      <p><strong>Date:</strong> 📅 {new Date(appointmentData.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ⏰ {new Date(appointmentData.time).toLocaleTimeString()}</p>
      <p><strong>Therapist:</strong> 👩‍⚕️ {appointmentData.therapistName}</p>
      <p><strong>Location:</strong> 📍 {appointmentData.location}</p>
      <p><strong>Disease:</strong> 🏥 {appointmentData.disease}</p>
    </div>
  );
};

export default Tickets;
