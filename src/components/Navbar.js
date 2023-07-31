// Import necessary dependencies and styles
import React from 'react';
import '../styles/Navbar.css'; // Import the Navbar.css styles
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to create navigation links
import NavigationIndicator from "./NavigationIndicator"; // Import the NavigationIndicator component

const Navbar = () => {
    return (
        // Navbar container with class "navbar"
        <nav className="navbar">
            {/* Navbar links container with class "navbar-links" */}
            <div className="navbar-links">
                {/* Navigation link that redirects to the home page */}
                <Link to="/">
                    Podcaster
                </Link>
            </div>
            {/* NavigationIndicator component to show loading indicator during navigation */}
            <NavigationIndicator />
        </nav>
    );
};

export default Navbar;