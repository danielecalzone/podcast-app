import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../components/LoadingIndicator';

describe('LoadingIndicator Component', () => {
    it('renders the loading indicator', () => {
        // Render the LoadingIndicator component
        render(<LoadingIndicator />);

        // Check if the loading indicator container is rendered
        const loadingIndicator = screen.getByTestId('loading-indicator');
        expect(loadingIndicator).toBeInTheDocument();

        // Alternatively, you can check if the loading spinner element is rendered within the container
        const loadingSpinner = screen.getByTestId('loading-spinner');
        expect(loadingSpinner).toBeInTheDocument();
    });
});





