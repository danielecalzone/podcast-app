// Import necessary dependencies and styles
import React, { useEffect, useState } from 'react';
import podcastService from '../hooks/podcastService'; // Import the podcastService to fetch data
import '../styles/Home.css'; // Import the Home.css styles
import { Link } from "react-router-dom"; // Import Link to handle navigation
import LoadingIndicator from "./LoadingIndicator"; // Import the LoadingIndicator component

const Home = () => {
    // Define state variables to store the list of podcasts and the search query
    const [podcasts, setPodcasts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Use the useEffect hook to fetch the list of top podcasts when the component mounts
    useEffect(() => {
        // Check if cached data exists in localStorage
        const cachedData = JSON.parse(localStorage.getItem('topPodcasts'));
        if (cachedData && Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
            // Data exists in cache and is less than a day old, use the cached data
            setPodcasts(cachedData.data);
        } else {
            // Fetch the list of 100 most popular podcasts from the podcastService
            // The service should handle caching the data in the client
            podcastService.getTopPodcasts().then((data) => {
                setPodcasts(data);
                // Cache the data for future use
                localStorage.setItem('topPodcasts', JSON.stringify({ data, timestamp: Date.now() }));
            });
        }
    }, []); // Fetch data only once when the component mounts

    // Handle changes in the search input field
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the podcasts based on the searchQuery
    const filteredPodcasts = podcasts.filter(
        (podcast) =>
            podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            podcast.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container">
            {/* Search bar to filter podcasts */}
            <div className="search-bar">
                <span className="search-number">
                    {filteredPodcasts.length}
                </span>
                <input
                    type="text"
                    placeholder="Filter podcasts..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {/* Display the list of podcast cards */}
            <div className="podcast-cards-container">
                {podcasts.length > 0 ? (
                    // Map through the filteredPodcasts array and render each podcast card
                    filteredPodcasts.map((podcast) => (
                        <div key={podcast.id} className="podcast-card">
                            {/* Link to navigate to the podcast details page */}
                            <Link to={`/podcast/${podcast.id}`}>
                                <div className="image-container">
                                    {/* Display the podcast image */}
                                    <img src={podcast.image} alt={podcast.title} />
                                </div>
                                <div className="podcast-details">
                                    {/* Display the podcast title and author */}
                                    <h3>{podcast.title}</h3>
                                    <p>Author: {podcast.author}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    // Show the LoadingIndicator if podcasts data is still loading
                    <LoadingIndicator />
                )}
            </div>
        </div>
    );
};

export default Home;