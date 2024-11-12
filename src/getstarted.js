import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

function Getstarted() {
  const navigate = useNavigate();  // Initialize useNavigate for programmatic navigation

  // Form submission handler for basic validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username?.value.trim(),
      email: e.target.email?.value.trim(),
      password: e.target.password?.value.trim(),
    };
    
    console.log('Form Data being sent:', formData); // Check if this has all values
  
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Account created successfully!');
        e.target.reset();
        navigate('/secondhome');
      } else {
        const data = await response.json();
        console.error('Server Response:', data);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };
  

  return (
    <div className="Getstarted-header">
      <h1>Get Started</h1>
      <h2>Create Your Account</h2>
      <form id="registrationForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name:</label>
        <input type="text" id="username" name="username" placeholder="Enter your full name" required />

        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter a password" required />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" required />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Getstarted;
