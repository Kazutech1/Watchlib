import axios from 'axios';

const API_KEY = 'f260cd43';
const BASE_URL = 'https://www.omdbapi.com/';
export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    return response.data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Example fetchMovies function for OMDb API
// Adjust fetchMovies to handle pagination and debug API response
export const fetchMoviesL = async (query, letter, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&page=${page}&apikey=${API_KEY}`);
    const data = await response.json();
    
    if (data.Response === 'True') {
      // Debug: Log the data to see what is being returned
      console.log('API Response:', data);
      
      // Filter movies by the starting letter
      const filteredMovies = data.Search.filter(movie => movie.Title.startsWith(letter));
      
      // If no movies match the starting letter, return an empty array with totalResults = 0
      return {
        movies: filteredMovies,
        totalResults: filteredMovies.length > 0 ? data.totalResults : 0,
      };
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { movies: [], totalResults: 0 };
  }
};


export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchSeriesAndEpisodes = async (title, season) => {
  try {
    // Fetch series data
    const response = await axios.get(`${BASE_URL}?t=${title}&Season=${season}&apikey=${API_KEY}`);
    const data = response.data;

    if (data.Response === 'True') {
      // Extract series info
      let seriesInfo = {
        Title: data.Title,
        Year: data.Year,
        Poster: data.Poster,
      };

      // If the series Poster is missing, search for a movie with the same title
      if (!seriesInfo.Poster || seriesInfo.Poster === 'N/A') {
        console.log('No poster available for this series. Searching in movies...');
        const moviePoster = await fetchMoviePoster(seriesInfo.Title);
        if (moviePoster) {
          seriesInfo.Poster = moviePoster;
        }
      }

      const episodes = data.Episodes.map((episode) => ({
        imdbID: episode.imdbID,
        Title: episode.Title,
        Episode: episode.Episode,
      }));

      return {
        series: seriesInfo,
        episodes,
        totalEpisodes: episodes.length,
      };
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error('Error fetching series and episodes:', error);
    return { series: {}, episodes: [], totalEpisodes: 0 };
  }
};

// Function to fetch a movie poster by title
const fetchMoviePoster = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}?s=${title}&apikey=${API_KEY}`);
    const movieData = response.data;

    if (movieData.Response === 'True' && movieData.Search.length > 0) {
      // Return the poster of the first movie found with the same title
      return movieData.Search[0].Poster;
    }
  } catch (error) {
    console.error('Error fetching movie poster:', error);
  }
  return null; // Return null if no poster is found
};
