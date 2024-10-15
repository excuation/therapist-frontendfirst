import React, { useState } from 'react';

const Chatboard = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div style={{ position: 'fixed', right: '20px', bottom: '20px', zIndex: '1000' }}>
      <svg
        onClick={toggleChat}
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        fill="currentColor"
        className="bi bi-chat"
        viewBox="0 0 16 16"
        style={{
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      >
        <path
          d="M2 2a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h9.586L14 15.414V11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm0-1h12a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-3v3.5L9.5 14H2a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3z"
        />
      </svg>

      {showChat && (
        <div style={{ marginTop: '10px', maxWidth: '350px' }}>
          <iframe
            width="350"
            height="430"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/da040cde-f4d3-4301-97df-ec47c47efb82"
            style={{
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              border: 'none'
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chatboard;
