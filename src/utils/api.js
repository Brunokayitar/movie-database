const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '6ed21e84';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
  if (!query.trim()) return [];
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await response.json();
  if (data.Response === 'True') {
    return data.Search;
  } else {
    throw new Error(data.Error || 'No movies found');
  }
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  const data = await response.json();
  if (data.Response === 'True') {
    return data;
  } else {
    throw new Error(data.Error || 'Movie not found');
  }
};
