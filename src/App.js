// Import necessary modules and components from React and react-router-dom
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Import the different components used in the app
import Home from './components/Home';
import PodcastDetails from './components/PodcastDetails';
import EpisodeDetails from './components/EpisodeDetails';
import Navbar from './components/Navbar';
import LoadingIndicator from './components/LoadingIndicator';

// Define the main App component
const App = () => {
    // State to manage the loading indicator
    const [isLoading, setIsLoading] = useState(false);

    // Effect hook to handle the loading indicator based on route changes
    useEffect(() => {
        // Set isLoading to true when starting navigation and false when navigation ends
        const handleStartLoading = () => setIsLoading(true);
        const handleEndLoading = () => setIsLoading(false);

        // Listen for 'routeStart' and 'routeEnd' events to update isLoading
        document.addEventListener('routeStart', handleStartLoading);
        document.addEventListener('routeEnd', handleEndLoading);

        // Cleanup by removing event listeners when the component is unmounted
        return () => {
            document.removeEventListener('routeStart', handleStartLoading);
            document.removeEventListener('routeEnd', handleEndLoading);
        };
    }, []);

    // JSX rendering of the App component
    return (
        // Router component wrapping the whole app to enable routing
        <Router>
            {/* Render the Navbar component */}
            <Navbar />

            {/* The main content of the app */}
            <div>
                {/* Conditional rendering of the LoadingIndicator component based on isLoading state */}
                {isLoading && <LoadingIndicator />}

                {/* Declare routes and their corresponding components */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                    <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

// Export the App component as the default export
export default App;