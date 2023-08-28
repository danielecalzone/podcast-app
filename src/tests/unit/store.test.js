import { configureStore } from '@reduxjs/toolkit';
import podcastsReducer from '../../redux/podcastsSlice';
import podcastDetailsReducer from '../../redux/podcastDetailsSlice';
import podcastEpisodeReducer from '../../redux/podcastEpisodeSlice';

describe('Redux Store Configuration', () => {
    it('should configure the store correctly', () => {
        // Configure the Redux store with combined reducers
        const store = configureStore({
            reducer: {
                podcasts: podcastsReducer,
                podcastDetails: podcastDetailsReducer,
                podcastEpisode: podcastEpisodeReducer,
            },
        });

        // Check the initial state of the store
        const expectedInitialState = {
            podcasts: [],
            podcastDetails: { podcast: null, episodes: [] },
            podcastEpisode: { podcast: null, episode: null },
        };
        expect(store.getState()).toEqual(expectedInitialState);
    });
});