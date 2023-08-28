// Define a mock podcast object for testing purposes
export const mockPodcast = {
    collectionId: 123, // Unique identifier for the podcast collection
    collectionCensoredName: 'Podcast Name', // Name of the podcast
    artistName: 'Podcast Artist', // Name of the podcast artist
    artworkUrl600: 'podcast-image.jpg', // URL to the artwork image for the podcast
    trackCensoredName: 'Podcast Description', // Description of the podcast
};

// Define an array of mock episodes for testing purposes
export const mockEpisodes = [
    {
        trackId: 1, // Unique identifier for the episode
        trackName: 'Episode 1 in podcastDetails', // Name of the episode
        releaseDate: '2023-01-01', // Release date of the episode
        trackTimeMillis: 3600000, // Duration of the episode in milliseconds
    },
    // Add more mock episodes as needed
];