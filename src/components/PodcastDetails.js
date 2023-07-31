// Import necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link and useParams from react-router-dom
import podcastService from '../hooks/podcastService'; // Import the podcastService for fetching podcast details and episodes
import LoadingIndicator from "./LoadingIndicator"; // Import the LoadingIndicator component
import '../styles/PodcastDetails.css'; // Import the PodcastDetails.css styles

const ProductDetails = () => {
    // Extract the 'podcastId' from the URL using useParams
    const { podcastId } = useParams();

    // State variables to store podcast details and episodes
    const [podcast, setPodcast] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    // useEffect hook to fetch podcast details and episodes when the component mounts or 'podcastId' changes
    useEffect(() => {
        // Check if cached data for the specific podcast ID exists in localStorage
        const cachedData = JSON.parse(localStorage.getItem(`podcast-${podcastId}`));
        if (cachedData && Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
            // Data exists in cache and is less than a day old, use the cached data
            setPodcast(cachedData.podcast);
            setEpisodes(cachedData.episodes);
        } else {
            // Fetch the podcast details and episodes from the podcastService
            podcastService.getPodcastDetails(podcastId).then((data) => {
                if (data && data.results.length > 0) {
                    const podcastData = data.results[0];
                    setPodcast(podcastData);
                    setEpisodes(data.results.slice(1)); // Exclude the first element (podcast details)

                    // Cache the data for future use
                    const cachedData = {
                        podcast: podcastData,
                        episodes: data.results.slice(1),
                        timestamp: Date.now(),
                    };
                    localStorage.setItem(`podcast-${podcastId}`, JSON.stringify(cachedData));
                }
            });
        }
    }, [podcastId]);

    // Helper function to format the duration of an episode from milliseconds to 'hh:mm:ss' format
    const formatDuration = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
        const formattedMinutes = (minutes % 60).toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    // Helper function to format a date from a date string to 'dd/mm/yyyy' format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Render the component
    return (
        <div>
            {podcast ? ( // If podcast details are available, render the podcast details and episodes
                <div className="product-details-container">
                    <div className="podcast-details-card">
                        <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
                        <div className="podcast-info">
                            <h3>{podcast.collectionCensoredName}</h3>
                            <p>By {podcast.artistName}</p>
                            <h4>Description:</h4>
                            <p>{podcast.trackCensoredName}</p>
                        </div>
                    </div>
                    <div className="episodes-container">
                        <div className="episodes-header">
                            <h2>Episodes: {episodes.length}</h2>
                        </div>
                        <div className="episodes-table">
                            <table>
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Release Date</th>
                                    <th>Duration</th>
                                </tr>
                                </thead>
                                <tbody>
                                {episodes.map((episode) => (
                                    <tr key={episode.trackId}>
                                        <td>
                                            <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                                                {episode.trackName}
                                            </Link>
                                        </td>
                                        <td>{formatDate(episode.releaseDate)}</td>
                                        <td>{formatDuration(episode.trackTimeMillis)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : ( // If podcast details are not available, render the LoadingIndicator
                <LoadingIndicator />
            )}
        </div>
    );
};

export default ProductDetails;