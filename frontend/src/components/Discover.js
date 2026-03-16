import React, { useState } from 'react';
import './Discover.css';

function Discover() {
  const [filter, setFilter] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Mock trending content - in production, fetch from TMDB API
  const trendingContent = [
    { id: 1, title: 'The Last of Us', type: 'Series', platform: 'HBO Max', rating: 9.1, genre: 'Drama', year: 2023, image: '🎬' },
    { id: 2, title: 'Oppenheimer', type: 'Movie', platform: 'Prime Video', rating: 8.9, genre: 'Biography', year: 2023, image: '🎬' },
    { id: 3, title: 'The Bear', type: 'Series', platform: 'Hulu', rating: 8.8, genre: 'Comedy', year: 2023, image: '🎬' },
    { id: 4, title: 'Past Lives', type: 'Movie', platform: 'Netflix', rating: 8.6, genre: 'Romance', year: 2023, image: '🎬' },
    { id: 5, title: 'Succession', type: 'Series', platform: 'HBO Max', rating: 9.3, genre: 'Drama', year: 2023, image: '🎬' },
    { id: 6, title: 'Spider-Man: Across', type: 'Movie', platform: 'Netflix', rating: 8.8, genre: 'Animation', year: 2023, image: '🎬' },
  ];

  const filteredContent = trendingContent.filter(item => {
    const matchesType = filter === 'all' || item.type.toLowerCase() === filter;
    const matchesPlatform = selectedPlatform === 'all' || item.platform === selectedPlatform;
    return matchesType && matchesPlatform;
  });

  return (
    <div className="discover-container">
      <div className="discover-header">
        <h1>Discover</h1>
        <p>Explore trending movies and series across your platforms</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Content Type:</label>
          <div className="filter-buttons">
            <button 
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={filter === 'movie' ? 'active' : ''}
              onClick={() => setFilter('movie')}
            >
              Movies
            </button>
            <button 
              className={filter === 'series' ? 'active' : ''}
              onClick={() => setFilter('series')}
            >
              Series
            </button>
          </div>
        </div>

        <div className="filter-group">
          <label>Platform:</label>
          <select 
            value={selectedPlatform} 
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="platform-select"
          >
            <option value="all">All Platforms</option>
            <option value="Netflix">Netflix</option>
            <option value="Prime Video">Prime Video</option>
            <option value="Disney+">Disney+</option>
            <option value="HBO Max">HBO Max</option>
            <option value="Hulu">Hulu</option>
          </select>
        </div>
      </div>

      <div className="content-grid">
        {filteredContent.map((item) => (
          <div key={item.id} className="content-card">
            <div className="content-image">{item.image}</div>
            <div className="content-details">
              <h3>{item.title}</h3>
              <p className="content-meta">
                {item.type} • {item.year} • {item.genre}
              </p>
              <p className="content-rating">⭐ {item.rating}/10</p>
              <p className="content-platform-badge">{item.platform}</p>
              <div className="card-actions">
                <button className="btn-watch">Watch Now</button>
                <button className="btn-add-list">+ Watchlist</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <p className="no-results">No content found matching your filters.</p>
      )}
    </div>
  );
}

export default Discover;
