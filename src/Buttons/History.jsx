import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token

        const response = await axios.get('https://therapist-backend5.onrender.com/api/history', {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the headers
          }
        });

        setHistoryData(response.data);
      } catch (error) {
        console.error('Error fetching history:', error); // Log the error
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ backgroundColor: 'black', padding: '20px', color: 'white' }}>
      <h2>User History</h2>
      {historyData.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid white', padding: '10px' }}>Doctor Name</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Appointment</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((record) => (
              <tr key={record._id}>
                <td style={{ border: '1px solid white', padding: '10px' }}>{record.therapistName}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>{record.action}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>
                  {new Date(record.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
