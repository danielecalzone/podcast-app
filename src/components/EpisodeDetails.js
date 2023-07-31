// Import necessary dependencies and styles
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link to handle navigation
import podcastService from '../hooks/podcastService'; // Import the podcastService to fetch data
import LoadingIndicator from "./LoadingIndicator"; // Import the LoadingIndicator component
import '../styles/EpisodeDetails.css'; // Import the EpisodeDetails.css styles

const EpisodeDetails = () => {
    // Get the podcastId and episodeId from the URL parameters using useParams hook
    const { podcastId, episodeId } = useParams();

    // Define state variables to store podcast and episode data
    const [podcast, setPodcast] = useState(null);
    const [episode, setEpisode] = useState(null);

    // Use the useEffect hook to fetch podcast and episode data when component mounts
    useEffect(() => {
        // Fetch the podcast details and episodes from the podcastService using podcastId
        podcastService.getPodcastDetails(podcastId).then((data) => {
            if (data && data.results.length > 0) {
                // Store the podcast data in state
                const podcastData = data.results[0];
                setPodcast(podcastData);

                // Find the selected episode by its episodeId from the fetched data
                const selectedEpisode = data.results.slice(1).find((ep) => ep.trackId === Number(episodeId));
                setEpisode(selectedEpisode);
            }
        });
    }, [podcastId, episodeId]); // Fetch data whenever podcastId or episodeId changes

    return (
        <div>
            {/* Check if podcast and episode data is available */}
            {podcast && episode ? (
                // Render the episode details
                <div className="episode-details-container">
                    <div className="podcast-episode-card">
                        {/* Link to navigate back to the podcast details page */}
                        <Link to={`/podcast/${podcastId}`}>
                            {/* Display the podcast artwork */}
                            <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
                        </Link>
                        <div className="episode-info">
                            {/* Link to navigate back to the podcast details page */}
                            <Link to={`/podcast/${podcastId}`}>
                                {/* Display the podcast title, author, and episode name */}
                                <h3>{podcast.collectionCensoredName}</h3>
                                <p>By {podcast.artistName}</p>
                                <h4>Description:</h4>
                                <p>{podcast.trackCensoredName}</p>
                            </Link>
                        </div>
                    </div>
                    {/* Display the selected episode details */}
                    <div className="episode-details-content">
                        <h2>{episode.trackName}</h2>
                        <p>{episode.description}</p>
                        {/* Display audio player with episode audio */}
                        <audio controls>
                            <source src={episode.episodeUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            ) : (
                // Show the LoadingIndicator if podcast and episode data is still loading
                <LoadingIndicator />
            )}
        </div>
    );
};

export default EpisodeDetails;