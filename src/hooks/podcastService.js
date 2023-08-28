// podcastService object to handle API requests related to podcasts
import { fetchWithProxy } from "../utils/fetchWithProxy";
import { API_BASE_URL } from "../utils/constants";

const podcastService = {
    // Fetch the top 100 podcasts from the API
    async getTopPodcasts() {
        try {
            // Use fetchWithProxy for API call and return formatted JSON data
            const response = await fetchWithProxy(`${API_BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            // Extract and format podcast data from the response
            return data.feed.entry.map((entry) => ({
                id: entry.id.attributes['im:id'],
                title: entry['im:name'].label,
                author: entry['im:artist'].label,
                image: entry['im:image'][2].label,
                summary: entry.summary.label,
                link: entry.link.attributes.href,
                category: entry.category.attributes.term,
            }));
        } catch (error) {
            console.error('Error fetching top podcasts:', error);
            return [];
        }
    },

    // Fetch details of a specific podcast by its podcastId
    async getPodcastDetails(podcastId) {
        try {
            // Use fetchWithProxy for API call and return JSON data
            const response = await fetchWithProxy(`${API_BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return await response.json(); // Return fetched data
        } catch (error) {
            console.error('Error fetching podcast details:', error);
            return null;
        }
    },
};

// Export the podcastService object for use in other components
export default podcastService;