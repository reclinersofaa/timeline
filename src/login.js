import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [error, setError] = useState(''); // State to store error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/api/login', { // Replace with your backend API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log('JWT Token:', data.token);
        // You can store the token in localStorage or context if you need
        localStorage.setItem('token', data.token);
        navigate('/secondhome'); // Redirects to the second home page upon successful login
      } else {
        setError(data.message); // Set error message from backend response
      }
    } catch (err) {
      console.error(err);
      setError('Server error. Please try again later.');
    }

    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className="Login-header">
      <h1>Login to Your Account</h1>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <form id="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />

        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <br></br><button onClick={() => navigate('/getstarted')} className="signup-button">Sign up</button></p>
    </div>
  );
}

export default Login;
