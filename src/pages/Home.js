import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { fetchMovies, fetchMovieDetails } from '../services/api'; // Import fetchMovieDetails
import { generate } from 'random-words';
import MovieInfo from '../components/MovieOrSeriesDetail'; // Your existing component

const Home = () => {
  const [results, setResults] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [showResults, setShowResults] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); // State for selected movie

  const handleResults = (results) => {
    setResults(results);
  };

  useEffect(() => {
    const loadMovies = async () => {
      const randomWord = generate(); // Generate a random word
      const initialMovies = await fetchMovies(randomWord); // Use the random word in the query
      setResults(initialMovies);
    };

    loadMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prevIndex) => (prevIndex + 1) % results.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [results]);

  const handleToggleResults = () => {
    setShowResults(!showResults);
  };

  const handleMovieClick = async (movie) => {
    const movieDetails = await fetchMovieDetails(movie.imdbID); // Fetch movie details using the correct ID
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieDetails.Title + ' movie trailer')}`;
    setSelectedMovie({ ...movieDetails, youtubeSearchUrl }); // Set the selected movie with the YouTube link
  };
  
  return (
    <div className="home-container">
      {/* Conditionally render the movie info or the main page content */}
      {selectedMovie ? (
        <MovieInfo movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        <>
          <section className='SearchBar'>
            <SearchBar onResults={handleResults} />
          </section>

          {/* Toggle Button */}
          {showResults && (
            <button onClick={handleToggleResults} className="toggle-button">
              X
            </button>
          )}

          {/* Displaying Movies */}
          {showResults && (
            <div className="results">
              {results.length > 0 ? (
                results.map((item) => (
                  <div key={item.imdbID} className="result-item" onClick={() => handleMovieClick(item)}>
                    <img src={item.Poster} alt={item.Title} />
                    <h3>{item.Title}</h3>
                    <p>{item.Year}</p>
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          )}

          <section className="intro">
            <h1>Welcome to Watch Base</h1>
            <p>Your go-to platform for exploring and discovering movies and series.</p>
            <div className="cta-buttons">
              <Link to="/movies" className="btn">Explore Movies</Link>
              <Link to="/series" className="btn">Explore Series</Link>
            </div>
          </section>

          <section className="featured">
            <h2>Featured Picks</h2>
            <div className="featured-grid">
              {results.length >= 2 ? (
                <>
                  <div
                    key={featuredIndex}
                    className="featured-item"
                    style={{ animation: 'fadeIn 1s ease-in-out' }}
                  >
                    <img src={results[featuredIndex].Poster} alt={results[featuredIndex].Title} />
                    <h3>{results[featuredIndex].Title}</h3>
                    <p>Year: {results[featuredIndex].Year}</p>
                  </div>
                  <div
                    key={(featuredIndex + 1) % results.length}
                    className="featured-item"
                    style={{ animation: 'fadeIn 1s ease-in-out' }}
                  >
                    <img src={results[(featuredIndex + 1) % results.length].Poster} alt={results[(featuredIndex + 1) % results.length].Title} />
                    <h3>{results[(featuredIndex + 1) % results.length].Title}</h3>
                    <p>Year: {results[(featuredIndex + 1) % results.length].Year}</p>
                  </div>
                </>
              ) : (
                <p>Loading featured movies...</p>
              )}
            </div>
          </section>

          <section className="blog">
            <h2>Latest Blog Posts</h2>
            <div className="blog-grid">
              <div className="blog-item">
                <h3>The Evolution of Superhero Movies</h3>
                <p>Explore how superhero movies have evolved over the years, from classic comics to modern blockbusters.</p>
                <Link to="/blog/evolution-of-superhero-movies" className="read-more">Read More</Link>
              </div>
              <div className="blog-item">
                <h3>Top 10 Must-Watch TV Series in 2024</h3>
                <p>Check out our curated list of the top 10 TV series that you shouldn't miss in 2024.</p>
                <Link to="/blog/top-10-tv-series-2024" className="read-more">Read More</Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
