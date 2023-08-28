import { createSlice } from '@reduxjs/toolkit';

// Define a Redux slice for managing podcast details and episodes
const podcastDetailsSlice = createSlice({
    name: 'podcastDetails',
    initialState: {
        podcast: null,  // Initial value for the podcast object
        episodes: [],   // Initial value for episodes array
    },
    reducers: {
        // Reducer to set podcast details and episodes
        setPodcastDetails: (state, action) => {
            // Update state with payload data
            state.podcast = action.payload.podcast;
            state.episodes = action.payload.episodes;
        },
    },
});

// Export the action creators
export const { setPodcastDetails } = podcastDetailsSlice.actions;

// Export the reducer
export default podcastDetailsSlice.reducer;