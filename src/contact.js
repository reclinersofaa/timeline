import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './App.css'; // Assuming you have styles in App.css

function Contact() {
  // State to hold form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you shortly.');
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    // You can implement form submission to your backend here
  };

  return (
    <div className="ContactUs">
      <header>
        <h1>Contact Us</h1>
        <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/getstarted">Get Started</Link></li>
        <li><Link to="/knowme">Know me</Link></li>
        <li><Link to="/timeline">Interactive Timeline</Link></li>
        <li><Link to="/futureme">Future Me</Link></li>
        <li><Link to="/mission">Our Mission</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>

      </header>
      
      <main>
        <section>
          <h2>We'd love to hear from you!</h2>
          <form id="contactForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </section>
      </main>

     
    </div>
  );
}

export default Contact;
