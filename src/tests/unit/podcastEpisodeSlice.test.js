import podcastEpisodeSlice, { setPodcastData } from '../../redux/podcastEpisodeSlice';

describe('podcastEpisodeSlice', () => {
    it('should set podcast and episode data', () => {
        // Set up initial state
        const initialState = {
            podcast: null,
            episode: null,
        };

        // Define mock podcast and episode data
        const mockPodcast = {
            id: 1,
            title: 'Podcast Title',
            // ... other properties
        };

        const mockEpisode = {
            id: 1,
            title: 'Episode 1',
            // ... other properties
        };

        // Create the action with mock data
        const action = setPodcastData({
            podcast: mockPodcast,
            episode: mockEpisode,
        });

        // Dispatch the action to the reducer
        const newState = podcastEpisodeSlice(initialState, action);

        // Check if the state is updated correctly
        expect(newState.podcast).toEqual(mockPodcast);
        expect(newState.episode).toEqual(mockEpisode);
    });
});