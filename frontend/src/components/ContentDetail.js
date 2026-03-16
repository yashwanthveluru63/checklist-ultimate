import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import './ContentDetail.css';

const ContentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contents, deleteContent } = useContent();
  
  const content = contents.find(c => c.id === parseInt(id));

  if (!content) {
    return (
      <div className="not-found">
        <h2>Content not found</h2>
        <Link to="/" className="back-link">Back to Watchlist</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${content.title}"?`)) {
      deleteContent(content.id);
      navigate('/');
    }
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

  return (
    <div className="content-detail">
      <div className="detail-header">
        <Link to="/" className="back-button">← Back</Link>
        <div className="action-buttons">
          <Link to={`/edit/${content.id}`} className="edit-button">Edit</Link>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-title-section">
          <h1>{content.title}</h1>
          <span 
            className="status-badge" 
            style={{ backgroundColor: getStatusColor(content.status) }}
          >
            {content.status.replace('-', ' ')}
          </span>
        </div>

        <div className="detail-grid">
          <div className="detail-item">
            <label>Type:</label>
            <span className="type-badge">{content.type}</span>
          </div>

          {content.year && (
            <div className="detail-item">
              <label>Year:</label>
              <span>{content.year}</span>
            </div>
          )}

          {content.rating > 0 && (
            <div className="detail-item">
              <label>My Rating:</label>
              <span className="rating">{getRatingStars(content.rating)} ({content.rating}/5)</span>
            </div>
          )}

          {content.imdb_rating && (
            <div className="detail-item">
              <label>IMDb Rating:</label>
              <span>{content.imdb_rating}/10</span>
            </div>
          )}

          {content.genre && (
            <div className="detail-item full-width">
              <label>Genre:</label>
              <div className="genre-list">
                {content.genre.split(',').map((g, i) => (
                  <span key={i} className="genre-tag">{g.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {content.director && (
            <div className="detail-item">
              <label>Director:</label>
              <span>{content.director}</span>
            </div>
          )}

          {content.cast && (
            <div className="detail-item full-width">
              <label>Cast:</label>
              <span>{content.cast}</span>
            </div>
          )}

          {content.streaming_platforms && (
            <div className="detail-item">
              <label>Streaming On:</label>
              <span className="platform-text">{content.streaming_platforms}</span>
            </div>
          )}

          {content.type === 'series' && content.seasons && (
            <div className="detail-item">
              <label>Seasons:</label>
              <span>{content.seasons}</span>
            </div>
          )}

          {content.type === 'series' && content.total_episodes && (
            <div className="detail-item">
              <label>Episodes:</label>
              <span>{content.episodes_watched || 0} / {content.total_episodes}</span>
            </div>
          )}

          {content.runtime && (
            <div className="detail-item">
              <label>Runtime:</label>
              <span>{content.runtime}</span>
            </div>
          )}

          {content.date_added && (
            <div className="detail-item">
              <label>Date Added:</label>
              <span>{new Date(content.date_added).toLocaleDateString()}</span>
            </div>
          )}

          {content.date_finished && (
            <div className="detail-item">
              <label>Date Finished:</label>
              <span>{new Date(content.date_finished).toLocaleDateString()}</span>
            </div>
          )}

          {content.notes && (
            <div className="detail-item full-width notes-section">
              <label>Notes:</label>
              <p className="notes-text">{content.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
