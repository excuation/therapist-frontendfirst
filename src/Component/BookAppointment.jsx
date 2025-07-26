import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiCalendar, FiClock, FiMapPin, FiAlertTriangle } from 'react-icons/fi';

// 🔥 HARD-CODED BACKEND URL
const API_BASE_URL = 'https://therapist-backend5.onrender.com'; // <--- replace with your real backend URL

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date());
  const pdfRef = useRef();

  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/therapists/${id}`, {
          credentials: 'include'
        });
        const data = await response.json();
        setTherapist(data);
      } catch (error) {
        console.error('Error fetching therapist:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/users/me`, {
          credentials: 'include'
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchTherapist();
    fetchUser();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const appointmentData = {
        therapistId: id,
        userId: user?._id,
        date: date.toISOString(),
      };

      const response = await fetch(`${API_BASE_URL}/api/appointments/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(appointmentData)
      });

      const result = await response.json();

      if (response.ok) {
        await sendEmailWithPDF(result);
        alert('Appointment booked and confirmation sent!');
        navigate('/');
      } else {
        console.error('Error in sendEmailWithPDF:', result.message);
        alert('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Error booking appointment');
    }
  };

  const sendEmailWithPDF = async (appointment) => {
    const element = pdfRef.current;

    const opt = {
      margin: 1,
      filename: 'appointment-confirmation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).outputPdf('blob').then(async (pdfBlob) => {
      const formData = new FormData();
      formData.append('to', user?.email);
      formData.append('pdf', pdfBlob, 'appointment.pdf');
      formData.append('subject', 'Appointment Confirmation');
      formData.append('text', 'Please find your appointment confirmation attached.');

      const response = await fetch(`${API_BASE_URL}/api/email/send-pdf`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        console.error('Email failed to send');
      }
    });
  };

  if (!therapist || !user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Book Appointment with {therapist.name}</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-2"><FiCalendar className="inline mr-2" />Date</label>
        <DatePicker selected={date} onChange={(d) => setDate(d)} className="border p-2 rounded w-full" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2"><FiClock className="inline mr-2" />Time</label>
        <input type="time" className="border p-2 rounded w-full" value={date.toTimeString().slice(0,5)} onChange={(e) => {
          const [hours, minutes] = e.target.value.split(':');
          const newDate = new Date(date);
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
          setDate(newDate);
        }} />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2"><FiMapPin className="inline mr-2" />Location</label>
        <input type="text" className="border p-2 rounded w-full" value={therapist.location} readOnly />
      </div>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Book Now
      </button>

      {/* Hidden PDF Section */}
      <div style={{ display: 'none' }}>
        <div ref={pdfRef}>
          <h2>Appointment Confirmation</h2>
          <p><strong>Therapist:</strong> {therapist.name}</p>
          <p><strong>User:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> {date.toLocaleTimeString()}</p>
          <p><strong>Location:</strong> {therapist.location}</p>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
