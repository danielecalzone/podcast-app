import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/NavigationIndicator.css';

const NavigationIndicator = () => {
    const location = useLocation();
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(true); // Start navigation indicator

        const clearNavigationIndicator = () => {
            setIsNavigating(false);
        };

        const timer = setTimeout(clearNavigationIndicator, 500); // Clear after delay

        return () => clearTimeout(timer); // Clean up timer
    }, [location]);

    // Display navigation indicator with "active" class during navigation
    return <div className={`navigation-indicator${isNavigating ? ' active' : ''}`} />;
};

export default NavigationIndicator;