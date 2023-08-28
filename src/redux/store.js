import { configureStore } from '@reduxjs/toolkit';

// Import reducers from different slices
import podcastsReducer from './podcastsSlice';
import podcastDetailsReducer from './podcastDetailsSlice';
import podcastEpisodeSlice from "./podcastEpisodeSlice";

// Configure the Redux store
const store = configureStore({
    reducer: {
        podcasts: podcastsReducer,           // Reducer for podcasts state
        podcastDetails: podcastDetailsReducer, // Reducer for podcast details and episodes state
        podcastEpisode: podcastEpisodeSlice,   // Reducer for episode data state
    },
});

// Export the configured Redux store
export default store;