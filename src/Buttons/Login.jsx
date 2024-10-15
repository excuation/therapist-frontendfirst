import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please enter all fields');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('https://therapist-backend5.onrender.com/api/login', { email, password });
            console.log('Login successful!', res.data.token);

            // Save token in localStorage
            localStorage.setItem('token', res.data.token);
            
            // Set authenticated state in the parent component (App.js)
            setIsAuthenticated(true);
            

            alert('Login successful!');
            
            // Redirect to home or another page as needed
            navigate('/');

        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            setError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            backgroundColor: 'black', // Light blue background for the entire page
            minHeight: '100vh', // Make sure it covers the full viewport height
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                width: '30%',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Gradient background for the form
                color: '#fff',
                height: "400px"
            }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
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
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary ${loading ? 'disabled' : ''}`}
                        style={{
                            background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '10px 20px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            width: '100%',
                            color: '#fff',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                            transition: 'background 0.3s',
                        }}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p style={{ color: 'red', marginTop: '10px', fontWeight: '600' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
