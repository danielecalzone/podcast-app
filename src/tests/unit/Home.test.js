import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../../components/Home';
import mockPodcasts from "../mocks/mockPodcasts";

describe('Home Component', () => {

    // Define the initial state for the store
    const initialState = {
        podcasts: mockPodcasts,
    };

    const mockStore = configureStore([]);
    let store;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('displays podcasts and search bar', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        // Check if each podcast card is rendered
        for (const podcast of mockPodcasts) {
            const titleElement = screen.getByText(podcast.title);
            expect(titleElement).toBeInTheDocument();
        }

        // Check if the search bar is rendered
        const searchInput = screen.getByPlaceholderText('Filter podcasts...');
        expect(searchInput).toBeInTheDocument();
    });

    it('updates search query and filters podcasts', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        // Get the search input and type a search query
        const searchInput = screen.getByPlaceholderText('Filter podcasts...');
        searchInput.value = 'Podcast 1';
        fireEvent.change(searchInput);
        
        // Check if the filtered podcast card is rendered
        const filteredPodcast = screen.getByText('Podcast 1');
        expect(filteredPodcast).toBeInTheDocument();
    });

    it('displays loading indicator while fetching podcasts', async () => {
        // Define the loading state for the store
        const loadingState = {
            podcasts: [],
        };

        const loadingStore = mockStore(loadingState);

        render(
            <Provider store={loadingStore}>
                <MemoryRouter>
                    <Home />
                </MemoryRouter>
            </Provider>
        );

        // Check if the loading indicator is rendered
        await waitFor(() => {
            const loadingIndicator = screen.getByTestId('loading-indicator');
            expect(loadingIndicator).toBeInTheDocument();
        });
    });
});