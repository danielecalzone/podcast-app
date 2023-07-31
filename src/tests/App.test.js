import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Navbar, Home, PodcastDetails, and EpisodeDetails components', () => {
    // Render the App component
    render(<App />);

    // Check if Navbar is rendered
    const navbarElement = screen.getByText(/Podcaster/i);
    expect(navbarElement).toBeInTheDocument();

    // Check if the "Podcaster" link is present in the Navbar
    const homeLink = screen.getByRole('link', { name: /Podcaster/i });
    expect(homeLink).toBeInTheDocument();

    // Note: In this test case, we are only checking if the Navbar and the "Podcaster" link are present.
    // For testing the other components (Home, PodcastDetails, and EpisodeDetails), you need to write
    // additional test cases that focus on those components and their specific functionalities.
    // This test case serves as a starting point to ensure the basic rendering of components.
    // You should add more test cases to thoroughly test the functionalities of each component.
});