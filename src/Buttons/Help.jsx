import React from 'react';

const Help = () => {
    const containerStyle = {
        padding: '20px',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#121212',
        color: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
    };

    const searchSectionStyle = {
        marginBottom: '2rem',
        textAlign: 'center',
    };

    const inputStyle = {
        width: '100%',
        padding: '15px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #555',
        backgroundColor: '#333',
        color: '#fff',
        transition: 'border-color 0.3s',
    };

    const inputFocusStyle = {
        borderColor: '#FF4081',
        outline: 'none',
    };

    const commonQuestionsStyle = {
        marginTop: '2rem',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: '0',
    };

    const listItemStyle = {
        padding: '15px 0',
        borderBottom: '1px solid #444',
        transition: 'background-color 0.3s',
    };

    const listItemHoverStyle = {
        backgroundColor: '#1E1E1E',
    };

    const answerStyle = {
        marginTop: '0.5rem',
        fontSize: '14px',
        color: '#cccccc',
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={{ fontSize: '2.5rem', color: '#FF4081' }}>How Can We Help You?</h1>
                <input
                    type="search"
                    placeholder="Search..."
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#FF4081')}
                    onBlur={(e) => (e.target.style.borderColor = '#555')}
                />
            </div>
            <div style={commonQuestionsStyle}>
                <h2 style={{ color: '#FF4081' }}>Here are some common questions:</h2>
                <ul style={listStyle}>
                    {[
                        {
                            question: "How do I reset my password?",
                            answer: "To reset your password, go to the login page and click on 'Forgot password?'. Follow the instructions to reset it."
                        },
                        {
                            question: "Where can I find my order history?",
                            answer: "Your order history can be found in the 'My Orders' section under your account settings."
                        },
                        {
                            question: "How can I contact customer support?",
                            answer: "You can contact customer support by emailing support@example.com or calling 1-800-123-4567."
                        },
                        {
                            question: "What is the return policy?",
                            answer: "Our return policy allows returns within 30 days of purchase. Please check our website for full details."
                        },
                        {
                            question: "How do I update my account information?",
                            answer: "To update your account information, log in to your account and go to 'Account Settings'."
                        },
                    ].map((item, index) => (
                        <li 
                            key={index}
                            style={listItemStyle}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1E1E1E'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {item.question}
                            <div style={answerStyle}>{item.answer}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Help;
