import React, { useEffect, useState } from 'react';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://therapist-backend5.onrender.com/api/logs'); // Endpoint to get logs
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>{log.action}</strong> - {new Date(log.timestamp).toLocaleString()}
            {log.details && <p>{log.details}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
