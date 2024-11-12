import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        {/* Button that opens Getstarted in a new tab */}

       
        <br></br>
        <br></br>
        <br></br>
        <div class="container">
          
        <h1 class="t">TIMELINE</h1>
        <button onClick={() => window.open('/login', '_blank')} className="small-button">
          <img src={logo} className="App-logo" alt="logo" />
        </button>
        </div>

        <h6>Click on the capsule to get started</h6>

        <br />

        
      </header>
    </div>
  );
}

export default Home;