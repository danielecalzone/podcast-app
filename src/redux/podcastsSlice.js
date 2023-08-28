import { createSlice } from '@reduxjs/toolkit';

// Define a Redux slice for managing podcasts
const podcastsSlice = createSlice({
    name: 'podcasts',
    initialState: [],  // Initial value as an empty array for podcasts
    reducers: {
        // Reducer to set podcasts
        setPodcasts: (state, action) => action.payload,
    },
});

// Export the action creators
export const { setPodcasts } = podcastsSlice.actions;

// Export the reducer
export default podcastsSlice.reducer;