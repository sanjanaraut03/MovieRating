import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../head-logo.jpg';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const debounceSearch = (query) => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`)
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((err) => {
        setError('Failed to fetch search results');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      debounceSearch(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Function to reset the search input when a movie is clicked
  const handleMovieClick = () => {
    setSearchQuery(''); // Reset the search input
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img className="header__icon" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="end">
        <Link to="/movies/popular" style={{ textDecoration: 'none' }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: 'none' }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: 'none' }}>
          <span>Upcoming</span>
        </Link>
      </div>
      <br />
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Movies..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="searchInput"
        />
      </div>

      {searchQuery && searchResults.length > 0 && !loading && !error && (
        <div className="searchResults">
          <div className="imageGrid">
            {searchResults.map((movie) => (
              <div key={movie.id} className="imageItem">
                <Link to={`/movie/${movie.id}`} onClick={handleMovieClick}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="moviePoster"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Header;
