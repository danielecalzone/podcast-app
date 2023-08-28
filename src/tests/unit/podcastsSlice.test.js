import podcastsSlice, { setPodcasts } from '../../redux/podcastsSlice';

describe('podcastsSlice', () => {
    it('should set podcasts', () => {
        const initialState = [];

        const mockPodcasts = [
            {
                id: 1,
                title: 'Podcast 1',
                // ... other properties
            },
            {
                id: 2,
                title: 'Podcast 2',
                // ... other properties
            },
        ];

        // Dispatch the action to set the podcasts
        const action = setPodcasts(mockPodcasts);

        // Apply the action to the reducer and get the new state
        const newState = podcastsSlice(initialState, action);

        // Verify that the new state matches the expected podcasts
        expect(newState).toEqual(mockPodcasts);
    });
});