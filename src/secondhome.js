
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importing Link for navigation, useNavigate for programmatic navigation
import './App.css';

function SecondHome() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Logout function
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the login/sign-up page
    navigate('/login');
  };

  return (
    <div className="SecondHome">
      <header className="App-header">
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul>
            <li>
              {/* Trigger logout and navigate to /getstarted */}
              <a onClick={handleLogout} href="#">Log Out</a>
            </li>
            
            <li><Link to="/knowme">Know me</Link></li>
            <li><Link to="/timeline">Interactive Timeline</Link></li>
            <li><Link to="/futureme">Future Me</Link></li>
            <li><Link to="/mission">Our Mission</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        {/* Welcome Message */}
        <h1>WELCOME :)</h1>
        <section className="guide-content">
          <h3>How to Use the Timeline Website</h3>
          
          <p><strong>Know Me:</strong> Share your personality by answering fun personal questions.</p>
          
          <p><strong>Interactive Timeline:</strong> Record key moments and memories in a visual timeline.</p>

          <p><strong>Future Me:</strong> Send messages to your future self for reflection later on.</p>

          <p><strong>Our Mission:</strong> Discover the vision behind this platform and its purpose.</p>

          <p><strong>Contact Us:</strong> Reach out for support or to provide feedback.</p>
          
          <p>Explore these features to build your timeline and connect with your past and future self!</p>
        </section>
      </header>
    </div>
  );
}

export default SecondHome;
