import React, { useState, useEffect } from 'react';
import { fetchSeriesAndEpisodes } from '../services/api'; 
import './Series.css'; 

const SeriesAndEpisodes = () => {
  const [series, setSeries] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [title, setTitle] = useState('');
  const [season, setSeason] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(0);

  useEffect(() => {
    const loadSeriesAndEpisodes = async () => {
      const { series: fetchedSeries, episodes: fetchedEpisodes, totalEpisodes: results } = await fetchSeriesAndEpisodes(title, season);
      setSeries(fetchedSeries);
      setEpisodes(fetchedEpisodes);
      setTotalEpisodes(results);
    };

    if (title && season) {
      loadSeriesAndEpisodes();
    }
  }, [title, season]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="series-page">
      <header className="series-header">
        <h1>Series & Episodes Search</h1>
      </header>

      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Series Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </section>

      <section className="series-grid-section">
        {series && series.Title && (
          <div className="series-item">
            <img src={series.Poster} alt={series.Title} className="series-poster" />
            <h2 className="series-title">{series.Title}</h2>
            <p className="series-year">{series.Year}</p>
          </div>
        )}
        <div className="episodes-grid">
          {episodes.length > 0 ? (
            episodes.map((episode) => (
              <div key={episode.imdbID} className="episode-item">
                <h3 className="episode-title">{episode.Title}</h3>
                <p className="episode-number">Episode {episode.Episode}</p>
              </div>
            ))
          ) : (
            <p>No episodes found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default SeriesAndEpisodes;
