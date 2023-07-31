// Import necessary dependencies and styles
import React from 'react';
import '../styles/LoadingIndicator.css'; // Import the LoadingIndicator.css styles

const LoadingIndicator = () => {
    return (
        // Container to hold the loading indicator
        <div className="loading-indicator-container">
            {/* SVG spinner to represent the loading animation */}
            <div className="loading-spinner" />
        </div>
    );
};

export default LoadingIndicator;