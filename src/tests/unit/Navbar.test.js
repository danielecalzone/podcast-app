import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
    it('renders the navigation link correctly', () => {
        // Render the Navbar component within a MemoryRouter
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Check if the navigation link is rendered with the correct text
        const navLink = screen.getByText('Podcaster');
        expect(navLink).toBeInTheDocument();

        // Check if the navigation link has the correct path
        const navLinkHref = navLink.getAttribute('href');
        expect(navLinkHref).toBe('/');
    });

    it('renders the NavigationIndicator component', async () => {
        // Render the Navbar component within a MemoryRouter
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Use waitFor to wait for the navigation indicator to be present
        await waitFor(() => {
            const navigationIndicator = screen.getByTestId('navigation');
            expect(navigationIndicator).toBeInTheDocument();
        });
    });
});