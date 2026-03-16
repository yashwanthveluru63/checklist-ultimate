import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import './Watchlist.css';

const Watchlist = () => {
    const { content: contents, deleteContent } = useContent();
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getFilteredContents = () => {
    return (contents || []).filter(content => {
      const matchesType = filterType === 'all' || content.type === filterType;
      const matchesStatus = filterStatus === 'all' || content.status === filterStatus;
      const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  const getStatusColor = (status) => {
    const colors = {
      'plan-to-watch': '#3b82f6',
      'watching': '#10b981',
      'completed': '#8b5cf6',
      'on-hold': '#f59e0b',
      'dropped': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const filteredContents = getFilteredContents();

  return (
    <div className="watchlist">
      <div className="watchlist-header">
        <h1>My Watchlist</h1>
        <Link to="/add" className="add-btn">+ Add Content</Link>
      </div>

        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-number">{contents.length}</span>
                <span className="stat-label">Total</span>          
          </div>
                  <div className="stat-item">
                <span className="stat-number">{contents.filter(c => c.status === 'watching').length}</span>
                <span className="stat-label">Watching</span>
              </div>
                        <div className="stat-item">
            <span className="stat-number">{contents.filter(c => c.status === 'completed').length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{contents.filter(c => c.status === 'plan-to-watch').length}</span>
            <span className="stat-label">Plan to Watch</span>
          </div>
        </div>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="anime">Anime</option>
          <option value="documentary">Documentary</option>
        </select>

        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="plan-to-watch">Plan to Watch</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
          <option value="dropped">Dropped</option>
        </select>
      </div>

      <div className="content-count">
        {filteredContents.length} {filteredContents.length === 1 ? 'item' : 'items'}
      </div>

      <div className="content-grid">
        {filteredContents.map(content => (
          <div key={content.id} className="content-card">
            <div className="content-header">
              <h3>{content.title}</h3>
              <span 
                className="status-badge" 
                style={{ backgroundColor: getStatusColor(content.status) }}
              >
                {content.status.replace('-', ' ')}
              </span>
            </div>
            
            <div className="content-meta">
              <span className="type">{content.type}</span>
              <span className="year">{content.year}</span>
              {content.rating > 0 && (
                <span className="rating">{getRatingStars(content.rating)}</span>
              )}
            </div>

            {content.genre && (
              <div className="genres">
                {content.genre.split(',').map((g, i) => (
                  <span key={i} className="genre-tag">{g.trim()}</span>
                ))}
              </div>
            )}

            {content.streaming_platforms && (
              <div className="platforms">
                <small>{content.streaming_platforms}</small>
              </div>
            )}

            <div className="content-actions">
              <Link to={`/content/${content.id}`} className="view-btn">View</Link>
              <Link to={`/edit/${content.id}`} className="edit-btn">Edit</Link>
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this item?')) {
                    deleteContent(content.id);
                  }
                }}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📺</div>
          <h2>Your Watchlist is Empty</h2>
          <p>Start building your collection by adding movies, series, anime, or documentaries!</p>
          <Link to="/add" className="add-link">+ Add Your First Item</Link>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
