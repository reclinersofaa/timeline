// src/Layout.js
import React from 'react';
import './App.css'; // Ensure this contains the background styles

function Layout({ children }) {
    return (
        <div className="app-background">
            {/* Render the child components */}
            {children}
        </div>
    );
}

export default Layout;