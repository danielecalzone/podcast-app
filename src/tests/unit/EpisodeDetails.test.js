import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EpisodeDetails from '../../components/EpisodeDetails';
import podcastService from '../../hooks/podcastService';
import { mockPodcast } from "../mocks/mockPodcast";
import mockEpisode from "../mocks/mockEpisode";

// Mock the podcastService module
jest.mock('../../hooks/podcastService');

describe('EpisodeDetails Component', () => {

    // Define the loading and loaded state for the store
    const loadingState = {
        podcastEpisode: {
            podcast: null,
            episode: null,
        },
    };

    const loadedState = {
        podcastEpisode: {
            podcast: mockPodcast,
            episode: mockEpisode,
        },
    };

    const mockStore = configureStore([]);
    let store;

    beforeEach(() => {
        store = mockStore(loadingState);
        // Mock the resolved value of podcastService.getPodcastDetails
        podcastService.getPodcastDetails.mockResolvedValueOnce({
            results: [mockPodcast, mockEpisode],
        });
    });

    it('displays episode details', async () => {
        const podcastId = '123';
        const episodeId = '1';

        // Change the store state to the loaded state before rendering
        store = mockStore(loadedState);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/podcast/${podcastId}/episode/${episodeId}`]}>
                    <Routes>
                        <Route
                            path="/podcast/:podcastId/episode/:episodeId"
                            element={<EpisodeDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Wait for the audio element to appear
        await waitFor(() => {
            const audioPlayer = screen.getByRole('application');
            expect(audioPlayer).toBeInTheDocument();
        });

        // Check other details
        const podcastName = screen.getByText('Podcast Name');
        const episodeName = screen.getByText('Episode 1 in episodeDetails');
        const episodeDescription = screen.getByText('Episode description');

        // Perform a single assertion for all elements
        expect(podcastName).toBeInTheDocument();
        expect(episodeName).toBeInTheDocument();
        expect(episodeDescription).toBeInTheDocument();
    });

    it('displays loading indicator while fetching episode details', async () => {
        const podcastId = '123';
        const episodeId = '1';
        // Mock an empty result for podcastService.getPodcastDetails
        podcastService.getPodcastDetails.mockResolvedValueOnce({
            results: [],
        });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/podcast/${podcastId}/episode/${episodeId}`]}>
                    <Routes>
                        <Route
                            path="/podcast/:podcastId/episode/:episodeId"
                            element={<EpisodeDetails />}
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Use waitFor to wait for the loading indicator to appear
        await waitFor(() => {
            const loadingIndicator = screen.getByTestId('loading-indicator');
            expect(loadingIndicator).toBeInTheDocument();
        });
    });
});