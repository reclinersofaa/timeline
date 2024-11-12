import React, { useState } from 'react';
import './App.css'; // Assuming the CSS file is available
import { Link } from 'react-router-dom'; // Importing Link for navigation

function KnowMe() {
  const [formData, setFormData] = useState({
    favColor: '',
    favFood: '',
    DreamTrav: '',
    Hobby: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token if needed
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Thank you for sharing more about yourself!');
        setFormData({
          favColor: '',
          favFood: '',
          DreamTrav: '',
          Hobby: '',
        });
      } 
      else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } 
    catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
};


  return (
    <div className="KnowMe">
      <header>
        <h1>Know Me</h1>
        <nav className="navbar">
      <ul>
        <li><Link to="/secondhome">Home</Link></li>
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
          <h2>Let us know more about you!</h2>
          <form id="knowMeForm" className="form-layout" onSubmit={handleSubmit}>
            {/* Favorite Color Question */}
            <div className="form-group">
              <label htmlFor="favColor">What is your favorite color?</label>
              <input
                type="text"
                id="favColor"
                name="favColor" 
                placeholder="Enter color"
                className="small-input"
                value={formData.favColor} 
                onChange={handleChange}
                required
              />
            </div>

            {/* Favorite Food Question */}
            <div className="form-group">
              <label htmlFor="favFood">What is your favorite food?</label>
              <input
                type="text"
                id="favFood"
                name="favFood" 
                placeholder="Enter food"
                className="small-input"
                value={formData.favFood} 
                onChange={handleChange}
                required
              />
            </div>

            {/* Dream Destination Question */}
            <div className="form-group">
              <label htmlFor="DreamTrav">What is your dream travel destination?</label>
              <input
                type="text"
                id="DreamTrav"
                name="DreamTrav" 
                placeholder="Enter destination"
                className="small-input"
                value={formData.DreamTrav} 
                onChange={handleChange}
                required
              />
            </div>

            {/* Hobby Question */}
            <div className="form-group">
              <label htmlFor="Hobby">What is your hobby?</label>
              <input
                type="text"
                id="Hobby"
                name="Hobby" 
                placeholder="Enter hobby"
                className="small-input"
                value={formData.Hobby} 
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default KnowMe;
