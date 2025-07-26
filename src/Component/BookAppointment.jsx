import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiClock, FiMapPin, FiAlertTriangle } from 'react-icons/fi';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [therapist, setTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  // ✅ Fetch therapist details
  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`https://therapist-backend5.onrender.com/api/therapists/${id}`);
        if (!response.ok) throw new Error('Therapist not found');
        const data = await response.json();
        setTherapist(data);
      } catch (err) {
        console.error('Error fetching therapist:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapist();
  }, [id]);

  // ✅ Fetch user details using token
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://therapist-backend5.onrender.com/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  // ✅ Book appointment handler
  const handleBookAppointment = async () => {
    if (!selectedDate || !user || !therapist) {
      alert('Please select a date and make sure user/therapist data is loaded.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://therapist-backend5.onrender.com/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          therapistId: therapist._id,
          userId: user._id,
          date: selectedDate,
        }),
      });

      if (!response.ok) throw new Error('Failed to book appointment');

      const data = await response.json();
      alert('Appointment booked successfully!');
      navigate('/history'); // Redirect after success
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book appointment');
    }
  };

  // ✅ PDF download
  const handleDownloadPDF = () => {
    const element = document.getElementById('appointment-details');
    html2pdf().from(element).save('appointment-details.pdf');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}><FiAlertTriangle /> {error}</div>;

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '30px' }}>
      <div id="appointment-details" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h2>Book Appointment with {therapist?.name}</h2>
        <p><FiMapPin /> Location: {therapist?.location}</p>
        <p><FiClock /> Available: {therapist?.availability}</p>
        <p><FiCalendar /> Select Date:</p>

        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />

        <div style={{ marginTop: '20px' }}>
          <button onClick={handleBookAppointment} style={{ marginRight: '10px', padding: '10px 20px' }}>Book</button>
          <button onClick={handleDownloadPDF} style={{ padding: '10px 20px' }}>Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
