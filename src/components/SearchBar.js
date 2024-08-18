import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import './SearchBar.css';


const SearchBar = ({ onResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const results = await fetchMovies(query);
    onResults(results);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search for movies or series..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};


export default SearchBar;
