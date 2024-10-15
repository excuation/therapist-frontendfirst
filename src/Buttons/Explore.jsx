import React, { useState } from 'react';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Example data for therapy services with contact numbers and emergency tag
  const services = [
    { id: 1, title: 'Mental Health Counseling', description: 'Professional counseling to support mental health.', category: 'Mental Health', contact: '+1 (123) 456-7890', isEmergency: false },
    { id: 2, title: 'Physical Therapy', description: 'Help recovering from physical injuries or surgeries.', category: 'Physical Therapy', contact: '+1 (987) 654-3210', isEmergency: true },
    { id: 3, title: 'Family Therapy', description: 'Counseling to improve family relationships.', category: 'Counseling', contact: '+1 (555) 123-4567', isEmergency: false },
  ];

  const filteredServices = services.filter(service => 
    (selectedCategory === 'All' || service.category === selectedCategory) &&
    service.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#121212',
      color: '#fff',
      minHeight: '100vh',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    searchFilter: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '200px',
      backgroundColor: '#222',
      color: '#fff',
    },
    select: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: '#222',
      color: '#fff',
    },
    featuredServices: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    serviceCard: {
      border: '1px solid #333',
      borderRadius: '4px',
      padding: '15px',
      backgroundColor: '#1f1f1f',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
    },
    button: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    emergency: {
      color: 'red',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Explore Our Therapy Services</h1>

      {/* Search and Filter */}
      <div style={styles.searchFilter}>
        <input 
          type="text" 
          placeholder="Search services..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={styles.input}
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Categories</option>
          <option value="Mental Health">Mental Health</option>
          <option value="Physical Therapy">Physical Therapy</option>
          <option value="Counseling">Counseling</option>
        </select>
      </div>

      {/* Featured Services */}
      <div style={styles.featuredServices}>
        {filteredServices.map(service => (
          <div key={service.id} style={styles.serviceCard}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Contact: {service.contact}</p>
            {service.isEmergency && <p style={styles.emergency}></p>}
            <button 
              style={styles.button} 
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor} 
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
