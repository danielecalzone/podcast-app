import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PodcastDetails from '../../components/PodcastDetails';
import podcastService from '../../hooks/podcastService';
import { mockEpisodes, mockPodcast } from '../mocks/mockPodcast';

jest.mock('../../hooks/podcastService'); // Mock the podcastService module

describe('PodcastDetails Component', () => {

    const loadingState = {
        podcastDetails: {
            podcast: null,
            episodes: null,
        },
    };

    const loadedState = {
        podcastDetails: {
            podcast: mockPodcast,
            episodes: mockEpisodes,
        },
    };

    const mockStore = configureStore([]);
    let store;

    beforeEach(() => {
        store = mockStore(loadingState); // Use the loading state for initial state
        podcastService.getPodcastDetails.mockResolvedValueOnce({
            results: [mockPodcast, ...mockEpisodes],
        });
    });

    it('displays podcast details and episodes', async () => {
        const podcastId = '123'; // Change to the appropriate podcastId

        // Change the store state to the loaded state before rendering
        store = mockStore(loadedState);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/podcast/${podcastId}`]}>
                    <Routes> {/* Wrap Routes around your Route components */}
                        <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // Check if podcast details are rendered
        const podcastName = screen.getByText('Podcast Name');
        const podcastDescription = screen.getByText('Podcast Description');
        expect(podcastName).toBeInTheDocument();
        expect(podcastDescription).toBeInTheDocument();

        // Check if episode details are rendered
        for (const episode of mockEpisodes) {
            const episodeName = screen.getByText(episode.trackName);
            const episodeReleaseDate = screen.getByText('01/01/2023');
            const episodeDuration = screen.getByText('01:00:00');
            expect(episodeName).toBeInTheDocument();
            expect(episodeReleaseDate).toBeInTheDocument();
            expect(episodeDuration).toBeInTheDocument();
        }
    });

    it('displays loading indicator while fetching podcast details and episodes', async () => {
        const podcastId = '123'; // Change to the appropriate podcastId

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/podcast/${podcastId}`]}>
                    <Routes> {/* Wrap Routes around your Route components */}
                        <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
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