// src/components/MovieDetails.js

import React, { useState, useEffect } from 'react';
import { fetchMoviesL, fetchMovieDetails } from '../services/api';
import MovieInfo from '../components/MovieOrSeriesDetail';
import './Movies.css';

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [pageRange, setPageRange] = useState({ start: 1, end: 7 });

  const moviesPerPage = 10;
  const totalPages = Math.ceil(totalResults / moviesPerPage);

  useEffect(() => {
    const loadMovies = async () => {
      const { movies: fetchedMovies, totalResults: results } = await fetchMoviesL(title, year, currentPage);
      setMovies(fetchedMovies);
      setTotalResults(results);
    };

    loadMovies();
  }, [title, year, currentPage]);

  useEffect(() => {
    // Adjust the pagination range based on the current page
    if (currentPage > pageRange.end) {
      setPageRange({ start: pageRange.end + 1, end: Math.min(pageRange.end + 7, totalPages) });
    } else if (currentPage < pageRange.start) {
      setPageRange({ start: Math.max(pageRange.start - 7, 1), end: pageRange.start - 1 });
    }
  }, [currentPage, pageRange, totalPages]);

  const handleMovieClick = async (id) => {
    const movieDetails = await fetchMovieDetails(id);
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieDetails.Title + ' movie trailer')}`;
    setSelectedMovie({ ...movieDetails, youtubeSearchUrl });
  };
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSelectedMovie(null);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = pageRange.start; i <= pageRange.end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {pageRange.start > 1 && (
          <button onClick={() => paginate(pageRange.start - 1)} className="page-number">
            Previous
          </button>
        )}
        {pages}
        {pageRange.end < totalPages && (
          <button onClick={() => paginate(pageRange.end + 1)} className="page-number">
            Next
          </button>
        )}
      </>
    );
  };

  return (
    <div className="movies-page">
      <header className="movies-header">
        <h1>Movie Search</h1>
      </header>

      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>

      {selectedMovie ? (
        <MovieInfo movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <section className="movies-grid-section">
          <div className="movies-grid">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.imdbID)}>
                  <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                  <h3 className="movie-title">{movie.Title}</h3>
                  <p className="movie-year">{movie.Year}</p>
                </div>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </section>
      )}

      {!selectedMovie && (
        <section className="pagination-section">
          <div className="pagination">
            {renderPagination()}
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
