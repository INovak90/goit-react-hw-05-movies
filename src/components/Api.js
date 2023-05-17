import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org';
const API_Key = 'api_key=826a06ffcfa9fc5eee1fcd68c442c531';

export const FetchPopularFilms = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?${API_Key}`
  );
  return response.data.results;
};

export const FetchSearchQueryFilms = async query => {
  const response = await axios.get(
    `/3/search/movie?${API_Key}&language=en-US&query=${query}&page=1&include_adult=false`
  );
  return response.data.results;
};

export const FetchReviews = async id => {
  const response = await axios.get(
    `3/movie/${id}/reviews?${API_Key}&language=en-US&page=1`
  );
  return response.data.results;
};
export const FetchDetails = async id => {
  const response = await axios.get(`3/movie/${id}?${API_Key}&language=en-US`);
  return response.data;
};

export const FetchCast = async id => {
  const response = await axios.get(
    `3/movie/${id}/credits?${API_Key}&language=en-US`
  );
  return response.data.cast;
};
