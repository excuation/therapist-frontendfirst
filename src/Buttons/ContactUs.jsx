import React from 'react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', padding: '20px', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Us</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>We would love to hear from you! Please fill out the form below.</p>

      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>Our Address</h2>
        <p>123 Therapist Lane, City, State, ZIP</p>
        <p>Email: support@therapist.com</p>
        <p>Phone: +1 (123) 456-7890</p>
      </div>

      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>Get in Touch</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input type="text" id="name" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" id="email" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '5px' }}>Message:</label>
            <textarea id="message" rows="4" required style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}></textarea>
          </div>
          <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>Send Message</button>
        </form>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>Find Us Here</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15249885.318783779!2d82.75252934999999!3d21.0680074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sus!4v1728819063058!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0, margin: '0 auto', display: 'block' }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
