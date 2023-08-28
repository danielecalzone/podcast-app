import React from 'react';
import '../styles/LoadingIndicator.css';

const LoadingIndicator = () => {
    return (
        <div data-testid="loading-indicator" className="loading-indicator-container">
            {/* Loading spinner */}
            <div data-testid="loading-spinner" className="loading-spinner" />
        </div>
    );
};

export default LoadingIndicator;