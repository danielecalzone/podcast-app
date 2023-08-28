import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import Home from "../../components/Home";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import mockPodcasts from '../mocks/mockPodcasts';
import { mockEpisodes, mockPodcast } from "../mocks/mockPodcast";
import mockEpisode from "../mocks/mockEpisode";
import PodcastDetails from "../../components/PodcastDetails";
import EpisodeDetails from "../../components/EpisodeDetails";

const initialState = {
    podcasts: mockPodcasts,
    podcastDetails: {
        podcast: mockPodcast,
        episodes: mockEpisodes,
    },
    podcastEpisode: {
        podcast: mockPodcast,
        episode: mockEpisode,
    },
};

const mockStore = configureStore([]);
let store;

beforeEach(() => {
    store = mockStore(initialState);
});

describe('App Integration Test', () => {
    test('renders Navbar', () => {
        render(<App />);
        const navbarElement = screen.getByTestId('navigation');
        expect(navbarElement).toBeInTheDocument();
    });

    test('renders Home component on the default route', () => {
        render(<App />);
        const homeElement = screen.getByTestId('homepage');
        expect(homeElement).toBeInTheDocument();
    });

    test('navigates from Home to PodcastDetails component when the podcast link is clicked', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Home />
                    <PodcastDetails />
                </MemoryRouter>
            </Provider>
        );

        const podcastLinkElements = screen.getAllByText('Podcast 1');
        expect(podcastLinkElements.length).toBeGreaterThan(0);

        fireEvent.click(screen.getByText('Podcast 1'));

        const podcastDetailsElement = screen.getByText('Podcast Name');
        expect(podcastDetailsElement).toBeInTheDocument();
    });

    test('navigates from PodcastDetails to EpisodeDetails component when the episode link is clicked', () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <PodcastDetails />
                    <EpisodeDetails />
                </MemoryRouter>
            </Provider>
        );

        const episodeLinkElements = screen.getAllByText('Episode 1 in podcastDetails');
        expect(episodeLinkElements.length).toBeGreaterThan(0);

        fireEvent.click(screen.getByText('Episode 1 in podcastDetails'));

        const episodeDetailsElement = screen.getByText('Episode 1 in episodeDetails');
        expect(episodeDetailsElement).toBeInTheDocument();
    });
});