import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ setProfilePicture }) => {
    const [user, setUser] = useState({});
    const [profilePicture, setProfilePictureLocal] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://therapist-backend5.onrender.com/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setProfilePictureLocal(response.data.profilePicture);
                setProfilePicture(response.data.profilePicture); // Set initial profile picture in header
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to load user profile');
            }
        };
        fetchUserProfile();
    }, [setProfilePicture]);

    // Handle file input change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle profile picture upload
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://therapist-backend5.onrender.com/api/upload-profile-picture', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProfilePictureLocal(response.data.profilePicture);
            setProfilePicture(response.data.profilePicture); // Update header with new profile picture
        } catch (error) {
            console.error('Error uploading profile picture:', error.response?.data?.msg || error.message);
            setError('Failed to upload profile picture');
        }
    };

    return (
        <div style={{
            backgroundColor: 'black',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)',
            color: '#000',
            fontFamily: 'Poppins, sans-serif',
        }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '20px' }}>
                {user.name ? `${user.name}'s Profile` : 'Profile'}
            </h2>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display any error messages */}

            <div style={{ margin: '20px 0' }}>
                {profilePicture ? (
                    <img
                        src={`https://therapist-backend5.onrender.com/${profilePicture}`}
                        alt="Profile"
                        style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                ) : (
                    <p style={{ color: '#fff' }}>No profile picture uploaded</p>
                )}
            </div>

            <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}><strong>Name:</strong> {user.name}</p>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}><strong>Email:</strong> {user.email}</p>

            <input
                type="file"
                onChange={handleFileChange}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '8px',
                    borderColor:'#ccc'
                }}
            />
            
            <button
                onClick={handleUpload}
                style={{
                    backgroundColor:'#3498db',
                    color:'white',
                    padding:'10px 20px',
                    borderRadius:'8px'
                }}
             >
                 Upload Profile Picture
             </button>
         </div>
     </div>
 );
};

export default Profile;