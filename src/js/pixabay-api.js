import axios from 'axios';

const API_KEY = '54256417-25db5ea9abd41c713c8abda81';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    });

    return axios.get(`${BASE_URL}?${searchParams}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            return response.data;
        });
}