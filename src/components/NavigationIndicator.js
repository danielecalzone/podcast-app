// Import necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom to access the current URL location
import '../styles/NavigationIndicator.css'; // Import the NavigationIndicator.css styles

const NavigationIndicator = () => {
    // Get the current URL location using useLocation hook
    const location = useLocation();

    // State variable to keep track of navigation status (true if navigating, false otherwise)
    const [isNavigating, setIsNavigating] = useState(false);

    // useEffect hook to run when the component mounts or the 'location' changes
    useEffect(() => {
        // Start the navigation indicator when the 'location' changes (i.e., navigation begins)
        setIsNavigating(true);

        // Function to clear the navigation indicator when navigation is finished
        const clearNavigationIndicator = () => {
            setIsNavigating(false);
        };

        // Set a timer to clear the navigation indicator after a brief delay (500 milliseconds)
        const timer = setTimeout(clearNavigationIndicator, 500);

        // Clean up the timer when the component unmounts or when 'location' changes
        return () => clearTimeout(timer);
    }, [location]);

    // Return the navigation indicator with a class "navigation-indicator" and additional "active" class
    // when 'isNavigating' is true (i.e., navigation is in progress)
    return <div className={`navigation-indicator${isNavigating ? ' active' : ''}`} />;
};

export default NavigationIndicator;