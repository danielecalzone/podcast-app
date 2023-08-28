import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import NavigationIndicator from "./NavigationIndicator";

const Navbar = () => {
    return (
        <nav data-testid="navigation" className="navbar">
            <div className="navbar-links">
                {/* Home page link */}
                <Link to="/">
                    Podcaster
                </Link>
            </div>
            <NavigationIndicator /> {/* Loading indicator */}
        </nav>
    );
};

export default Navbar;