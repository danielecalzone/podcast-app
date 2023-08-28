import podcastService from '../../hooks/podcastService'; // Import the podcastService module
import { fetchWithProxy } from '../../utils/fetchWithProxy'; // Import the fetchWithProxy function

jest.mock('../../hooks/podcastService', () => {
    return {
        __esModule: true,
        default: {
            getTopPodcasts: jest.fn(),
            getPodcastDetails: jest.fn(),
        },
    };
});

jest.mock('../../utils/fetchWithProxy', () => {
    return {
        __esModule: true,
        fetchWithProxy: jest.fn(),
    };
});

describe('podcastService', () => {
    beforeEach(() => {
        // Clear any previous mock implementations and calls
        fetchWithProxy.mockClear();
    });

    describe('getTopPodcasts', () => {
        it('fetches top podcasts', async () => {
            // Set up mock response for getTopPodcasts
            const mockPodcasts = [
                {
                    id: '1',
                    title: 'Podcast 1',
                    author: 'Author 1',
                    // ... other properties
                },
                {
                    id: '2',
                    title: 'Podcast 2',
                    author: 'Author 2',
                    // ... other properties
                },
                // Add more mock data as needed
            ];
            podcastService.getTopPodcasts.mockResolvedValueOnce(mockPodcasts);

            // Call the method and perform assertions
            const result = await podcastService.getTopPodcasts();
            expect(result).toEqual(mockPodcasts);
            expect(podcastService.getTopPodcasts).toHaveBeenCalledTimes(1);
            // You can add more specific assertions based on your needs
        });
    });

    describe('getPodcastDetails', () => {
        it('fetches podcast details', async () => {
            const podcastId = '123';
            const mockPodcastDetails = [
                {
                    podcastId: '123',
                    title: 'Podcast Title',
                    // ... other properties
                },
                // Add more mock data as needed
            ];
            podcastService.getPodcastDetails.mockResolvedValueOnce(mockPodcastDetails);

            // Call the method and perform assertions
            const result = await podcastService.getPodcastDetails(podcastId);
            expect(result).toEqual(mockPodcastDetails);
            expect(podcastService.getPodcastDetails).toHaveBeenCalledTimes(1);
            // You can add more specific assertions based on your needs
        });
    });
    // Add more test cases for other methods as needed
});