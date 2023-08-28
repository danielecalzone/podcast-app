import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import podcastService from '../hooks/podcastService';
import LoadingIndicator from "./LoadingIndicator";
import '../styles/PodcastDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { setPodcastDetails } from '../redux/podcastDetailsSlice';

const PodcastDetails = () => {
    const { podcastId } = useParams();
    const dispatch = useDispatch();
    const { podcast, episodes } = useSelector((state) => state.podcastDetails);

    useEffect(() => {
        dispatch(setPodcastDetails({ podcast: null, episodes: [] })); // Reset state before fetching
        // Caching logic
        const cachedData = JSON.parse(localStorage.getItem(`podcast-${podcastId}`));

        if (cachedData && Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
            dispatch(setPodcastDetails({ podcast: cachedData.podcast, episodes: cachedData.episodes }));
        } else {
            podcastService.getPodcastDetails(podcastId).then((data) => {
                if (data && data.results.length > 0) {
                    const podcastData = data.results[0];
                    dispatch(setPodcastDetails({ podcast: podcastData, episodes: data.results.slice(1) }));
                    const cachedData = {
                        podcast: podcastData,
                        episodes: data.results.slice(1),
                        timestamp: Date.now(),
                    };
                    localStorage.setItem(`podcast-${podcastId}`, JSON.stringify(cachedData));
                }
            });
        }
    }, [dispatch, podcastId]);

    const formatDuration = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
        const formattedMinutes = (minutes % 60).toString().padStart(2, '0');
        const formattedHours = hours.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            {podcast ? (
                <div className="product-details-container">
                    <div className="podcast-details-card">
                        {/* Display podcast details */}
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
                                            {/* Link to episode details */}
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
            ) : (
                <LoadingIndicator /> // Display loading indicator
            )}
        </div>
    );
};

export default PodcastDetails;