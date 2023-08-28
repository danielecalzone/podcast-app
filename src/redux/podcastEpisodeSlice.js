import { createSlice } from '@reduxjs/toolkit';

// Define a Redux slice for managing podcast and episode data
const podcastEpisodeSlice = createSlice({
    name: 'podcastEpisode',
    initialState: {
        podcast: null,  // Initial value for the podcast object
        episode: null,  // Initial value for the episode object
    },
    reducers: {
        // Reducer to set podcast and episode data
        setPodcastData: (state, action) => {
            // Update state with payload data
            state.podcast = action.payload.podcast;
            state.episode = action.payload.episode;
        },
    },
});

// Export the action creators
export const { setPodcastData } = podcastEpisodeSlice.actions;

// Export the reducer
export default podcastEpisodeSlice.reducer;