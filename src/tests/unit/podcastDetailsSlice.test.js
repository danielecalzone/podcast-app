import podcastDetailsReducer, { setPodcastDetails } from '../../redux/podcastDetailsSlice';

describe('podcastDetailsSlice', () => {
    it('should set podcast details and episodes', () => {
        // Set up initial state
        const initialState = {
            podcast: null,
            episodes: [],
        };

        // Define mock podcast and episode data
        const mockPodcast = {
            id: 1,
            title: 'Podcast Title',
            // ... other properties
        };

        const mockEpisodes = [
            {
                id: 1,
                title: 'Episode 1',
                // ... other properties
            },
            {
                id: 2,
                title: 'Episode 2',
                // ... other properties
            },
            // Add more mock episode data as needed
        ];

        // Create the action with mock data
        const action = setPodcastDetails({
            podcast: mockPodcast,
            episodes: mockEpisodes,
        });

        // Dispatch the action to the reducer
        const newState = podcastDetailsReducer(initialState, action);

        // Check if the state is updated correctly
        expect(newState.podcast).toEqual(mockPodcast);
        expect(newState.episodes).toEqual(mockEpisodes);
    });
});