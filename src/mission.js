import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './App.css'; // Assuming you have styles in App.css

function OurMission() {
  return (
    <div className="OurMission">
      <header>
        <h1>Our Mission</h1>
        <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
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
          <h2>Our Vision</h2>
          <p>
            At Time Capsule, we believe in the power of memories. Our goal is to help you preserve your thoughts, emotions, and stories, so that you can revisit them in the future and reflect on your personal growth.
          </p>
          <p>
            We aim to create a safe space for people to store their most meaningful moments and messages, offering the unique ability to send messages to your future self, track personal evolution, and share stories with your loved ones when the time is right.
          </p>
        </section>
      </main>
      
    </div>
  );
}

export default OurMission;
