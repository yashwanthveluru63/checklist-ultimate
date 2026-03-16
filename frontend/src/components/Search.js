import React, { useState } from 'react';
import './Search.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock search results - in production, this would call TMDB API or similar
  const mockResults = [
    { id: 1, title: 'Inception', year: 2010, type: 'Movie', rating: 8.8, platform: 'Netflix' },
    { id: 2, title: 'Breaking Bad', year: 2008, type: 'Series', rating: 9.5, platform: 'Netflix' },
    { id: 3, title: 'The Shawshank Redemption', year: 1994, type: 'Movie', rating: 9.3, platform: 'Prime Video' },
    { id: 4, title: 'Game of Thrones', year: 2011, type: 'Series', rating: 9.2, platform: 'HBO Max' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockResults.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h1>Search Movies & Series</h1>
        <p>Find your next watch across all your streaming platforms</p>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies or series..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

                  <div className="platforms-section">
        <h3>Popular Streaming Platforms</h3>
        <div className="platforms-grid">
          <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer" className="platform-card netflix">
            <div className="platform-name">Netflix</div>
          </a>
          <a href="https://www.primevideo.com" target="_blank" rel="noopener noreferrer" className="platform-card prime">
            <div className="platform-name">Prime Video</div>
          </a>
          <a href="https://www.hotstar.com" target="_blank" rel="noopener noreferrer" className="platform-card hotstar">
            <div className="platform-name">Disney+ Hotstar</div>
          </a>
          <a href="https://www.hulu.com" target="_blank" rel="noopener noreferrer" className="platform-card hulu">
            <div className="platform-name">Hulu</div>
          </a>
          <a href="https://www.hbomax.com" target="_blank" rel="noopener noreferrer" className="platform-card hbo">
            <div className="platform-name">HBO Max</div>
          </a>
          <a href="https://www.apple.com/apple-tv-plus" target="_blank" rel="noopener noreferrer" className="platform-card apple">
            <div className="platform-name">Apple TV+</div>
          </a>
        </div>
      </div>

      {loading && <p className="loading">Searching...</p>}

      <div className="search-results">
        {searchResults.length > 0 && (
          <h2>{searchResults.length} Results Found</h2>
        )}
        {searchResults.map((item) => (
          <div key={item.id} className="result-card">
            <div className="result-info">
              <h3>{item.title}</h3>
              <p className="result-meta">
                {item.type} • {item.year} • Rating: {item.rating}/10
              </p>
              <p className="result-platform">Available on: {item.platform}</p>
            </div>
            <div className="result-actions">
              <button className="btn-add">Add to Watched</button>
              <button className="btn-wishlist">Add to Wishlist</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
