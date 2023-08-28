import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PodcastDetails from './components/PodcastDetails';
import EpisodeDetails from './components/EpisodeDetails';
import Navbar from './components/Navbar';
import LoadingIndicator from './components/LoadingIndicator';
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleStartLoading = () => setIsLoading(true);
        const handleEndLoading = () => setIsLoading(false);

        // Listen for 'routeStart' and 'routeEnd' events to update isLoading
        document.addEventListener('routeStart', handleStartLoading);
        document.addEventListener('routeEnd', handleEndLoading);

        return () => {
            // Cleanup event listeners when component unmounts
            document.removeEventListener('routeStart', handleStartLoading);
            document.removeEventListener('routeEnd', handleEndLoading);
        };
    }, []);

    return (
        <Provider store={store}>
            <Router>
                {/* Render Navbar */}
                <Navbar />

                {/* Main content */}
                <div>
                    {/* Conditional LoadingIndicator */}
                    {isLoading && <LoadingIndicator />}

                    {/* Declare routes and components */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                        <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetails />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;