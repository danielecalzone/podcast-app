// Define constants for API_BASE_URL and PROXY_BASE_URL using environment variables

const API_BASE_URL = process.env.REACT_APP_API_PATH;
const PROXY_BASE_URL = process.env.REACT_APP_PROXY_PATH;

// Create an object called podcastService to handle API requests related to podcasts
const podcastService = {
    // Method to fetch the top 100 podcasts from the API
    async getTopPodcasts() {
        try {
            // API call using fetchWithProxy and return the JSON data
            const response = await fetchWithProxy(`${API_BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            // Extract the list of podcasts from the response and format the data
            const podcasts = data.feed.entry.map((entry) => ({
                id: entry.id.attributes['im:id'],
                title: entry['im:name'].label,
                author: entry['im:artist'].label,
                image: entry['im:image'][2].label,
                summary: entry.summary.label,
                link: entry.link.attributes.href,
                category: entry.category.attributes.term,
            }));
            return podcasts;
        } catch (error) {
            console.error('Error fetching top podcasts:', error);
            return [];
        }
    },

    // Method to fetch the details of a specific podcast by its podcastId
    async getPodcastDetails(podcastId) {
        try {
            // API call using fetchWithProxy and return the JSON data
            const response = await fetchWithProxy(`${API_BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            return data; // Return the fetched data
        } catch (error) {
            console.error('Error fetching podcast details:', error);
            return null;
        }
    },
}

// Helper function to fetch data using the proxy URL
async function fetchWithProxy(url) {
    try {
        // Fetch data using the PROXY_BASE_URL and the provided URL
        const response = await fetch(`${PROXY_BASE_URL}${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response; // Return the fetched response
    } catch (error) {
        console.error('Error fetching with proxy:', error);
        throw error;
    }
}

// Export the podcastService object to use in other components
export default podcastService;