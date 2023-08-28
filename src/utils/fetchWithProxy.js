import { PROXY_BASE_URL } from './constants';

// Fetch data using the proxy URL
export async function fetchWithProxy(url) {
    try {
        const response = await fetch(`${PROXY_BASE_URL}${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response;
    } catch (error) {
        console.error('Error fetching with proxy:', error);
        throw error;
    }
}