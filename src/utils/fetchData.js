import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  // url: BASE_URL,
  params: {
    maxResults: '50',
    // regionCode: 'IN'
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchData = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`,options);
    // console.log(response.data);

    return data;
}