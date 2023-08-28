import React, { useEffect, useState } from 'react';
import podcastService from '../hooks/podcastService';
import '../styles/Home.css';
import { Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../redux/podcastsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const podcasts = useSelector((state) => state.podcasts);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(setPodcasts([])); // Reset state before fetching
        // Caching logic
        const cachedData = JSON.parse(localStorage.getItem('topPodcasts'));

        if (cachedData && Date.now() - cachedData.timestamp < 24 * 60 * 60 * 1000) {
            dispatch(setPodcasts(cachedData.data)); // Use cached data
        } else {
            podcastService.getTopPodcasts().then((data) => {
                dispatch(setPodcasts(data));
                localStorage.setItem('topPodcasts', JSON.stringify({ data, timestamp: Date.now() }));
            });
        }
    }, [dispatch]);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPodcasts = podcasts.filter(
        (podcast) =>
            podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            podcast.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="home-container" data-testid="homepage">
            {/* Search bar */}
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

            {/* Podcast cards */}
            <div className="podcast-cards-container">
                {podcasts.length > 0 ? (
                    // Render podcast cards
                    filteredPodcasts.map((podcast) => (
                        <div key={podcast.id} className="podcast-card">
                            <Link to={`/podcast/${podcast.id}`} data-testid="podcast-link">
                                <div className="image-container">
                                    <img src={podcast.image} alt={podcast.title} />
                                </div>
                                <div className="podcast-details">
                                    <h3>{podcast.title}</h3>
                                    <p>Author: {podcast.author}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    // Loading indicator
                    <LoadingIndicator />
                )}
            </div>
        </div>
    );
};

export default Home;





