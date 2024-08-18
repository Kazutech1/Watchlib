import React from 'react';
import './MovieOrSeriesDetail.css'; // Create and style this CSS file as needed
const MovieInfo = ({ movie, onBack }) => {
  return (
    <div className="movie-info">
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className="movie-info-poster" />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Rated:</strong> {movie.Rated}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Writer:</strong> {movie.Writer}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Language:</strong> {movie.Language}</p>
      <p><strong>Country:</strong> {movie.Country}</p>
      <p><strong>Awards:</strong> {movie.Awards}</p>
      <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      <button onClick={onBack} className="back-button">Back to Search Results</button>
      {movie.youtubeSearchUrl && (
        <div className="movie-trailer">
          <h3>Search for Trailer</h3>
          <a id='youtube'
            href={movie.youtubeSearchUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Search on YouTube
          </a>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
