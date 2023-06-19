import axios from 'axios';

export async function getPageHTML(url) {
    try {
        const response = await axios.get(url);
        console.log("hello");
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching page HTML:', error);
        return null;
    }
}
