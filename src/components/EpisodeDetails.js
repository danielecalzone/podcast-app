import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import podcastService from '../hooks/podcastService';
import LoadingIndicator from "./LoadingIndicator";
import '../styles/EpisodeDetails.css';
import { useDispatch, useSelector } from "react-redux";
import { setPodcastData } from '../redux/podcastEpisodeSlice';

const EpisodeDetails = () => {
    const { podcastId, episodeId } = useParams();
    const dispatch = useDispatch();
    const { podcast, episode } = useSelector((state) => state.podcastEpisode);

    useEffect(() => {
        dispatch(setPodcastData({ podcast: null, episode: null }));

        // Caching logic
        const cacheKey = `podcast-${podcastId}-episode-${episodeId}`;
        const cachedData = JSON.parse(localStorage.getItem(cacheKey));

        if (
            cachedData &&
            Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000 &&
            cachedData.data.podcastId === podcastId &&
            cachedData.data.episodeId === episodeId
        ) {
            dispatch(setPodcastData(cachedData.data));
        } else {
            podcastService.getPodcastDetails(podcastId).then((data) => {
                if (data && data.results.length > 0) {
                    const podcastData = data.results[0];
                    const selectedEpisode = data.results.slice(1).find((ep) => ep.trackId === Number(episodeId));

                    dispatch(setPodcastData({ podcast: podcastData, episode: selectedEpisode }));

                    localStorage.setItem(
                        cacheKey,
                        JSON.stringify({
                            data: { podcast: podcastData, episode: selectedEpisode, podcastId, episodeId },
                            timestamp: Date.now(),
                        })
                    );
                }
            });
        }
    }, [dispatch, podcastId, episodeId]);

    return (
        <div>
            {podcast && episode ? (
                <div className="episode-details-container">
                    <div className="podcast-episode-card">
                        {/* Navigation */}
                        <Link to={`/podcast/${podcastId}`}>
                            <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
                        </Link>
                        <div className="episode-info">
                            {/* Navigation */}
                            <Link to={`/podcast/${podcastId}`}>
                                {/* Display podcast details */}
                                <h3>{podcast.collectionCensoredName}</h3>
                                <p>By {podcast.artistName}</p>
                                <h4>Description:</h4>
                                <p>{podcast.trackCensoredName}</p>
                            </Link>
                        </div>
                    </div>
                    {/* Display episode details */}
                    <div className="episode-details-content">
                        <h2>{episode.trackName}</h2>
                        <p>{episode.description}</p>
                        {/* Audio player */}
                        <audio controls role="application">
                            <source src={episode.episodeUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            ) : (
                // Loading indicator
                <LoadingIndicator />
            )}
        </div>
    );
};

export default EpisodeDetails;