import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        const userData = { name, email, password, confirmPassword };

        try {
            const response = await axios.post('https://therapist-backend5.onrender.com/api/signup', userData);
            if (response.status === 201) {
                setSuccessMessage(response.data.msg);
                localStorage.setItem('token', response.data.token);

                setTimeout(() => {
                    navigate('/some-other-page'); 
                }, 1000); 
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.msg);
            } else {
                setError('Error registering user');
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <div style={{
            backgroundColor: 'black', // Black background for the entire page
            minHeight: '100vh', // Cover full viewport height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '30%',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Gradient background for the form
                color: 'white',
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
                height:"600px"
            }}>
                <h2 className="text-center mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{ fontWeight: '600' }}>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            style={{
                                borderRadius: '8px',
                                padding: '10px',
                                border: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{ fontWeight: '600' }}>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            style={{
                                borderRadius: '8px',
                                padding: '10px',
                                border: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{ fontWeight: '600' }}>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            style={{
                                borderRadius: '8px',
                                padding: '10px',
                                border: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label" style={{ fontWeight: '600' }}>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                            style={{
                                borderRadius: '8px',
                                padding: '10px',
                                border: 'none',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                    </div>
                    <button type="submit" className={`btn btn-primary ${loading ? 'disabled' : ''}`} disabled={loading} style={{
                        background: loading ? '#95a5a6' : 'linear-gradient(45deg, #8e44ad, #3498db)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        transition: 'background 0.3s',
                    }}>
                        {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                </form>

                {loading && (
                    <>
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(1px)',
                            zIndex: 2 // Ensure blur is above the form
                        }} />
                        
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '18px solid #f3f3f3',
                                borderTopColor: '#3498db',
                                animation: 'spin 1s linear infinite'
                            }} />
                            <p style={{ color: '#333' }}>Loading... Please wait.</p>
                        </div>
                    </>
                )}

                {error && <div style={{ color: 'red', marginTop: '10px', fontWeight: '600' }}>{error}</div>}
                {successMessage && <div style={{ color: 'lightgreen', marginTop: '20px', fontWeight: '600' }}>{successMessage}</div>}
            </div>
        </div>
    );
};

export default Signup;

// Add this CSS for spinning animation in your global CSS file or inline styles
const styles = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
