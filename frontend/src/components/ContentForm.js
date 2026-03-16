import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import './ContentForm.css';

const ContentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contents, addContent, updateContent } = useContent();
  
  const isEditMode = Boolean(id);
  const existingContent = isEditMode ? contents.find(c => c.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    type: 'movie',
    status: 'plan-to-watch',
    rating: 0,
    imdb_rating: '',
    year: '',
    genre: '',
    cast: '',
    director: '',
    streaming_platforms: '',
    seasons: '',
    episodes_watched: '',
    total_episodes: '',
    runtime: '',
    date_added: new Date().toISOString().split('T')[0],
    date_finished: '',
    notes: ''
  });

  useEffect(() => {
    if (isEditMode && existingContent) {
      setFormData(existingContent);
    }
  }, [isEditMode, existingContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    const contentData = {
      ...formData,
      rating: parseInt(formData.rating) || 0,
      year: formData.year || null,
      imdb_rating: formData.imdb_rating || null
    };

    if (isEditMode) {
      updateContent(parseInt(id), contentData);
    } else {
      addContent(contentData);
    }

    navigate('/');
  };

  return (
    <div className="content-form">
      <div className="form-header">
        <h1>{isEditMode ? 'Edit Content' : 'Add New Content'}</h1>
        <Link to="/" className="cancel-link">Cancel</Link>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="anime">Anime</option>
                <option value="documentary">Documentary</option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="plan-to-watch">Plan to Watch</option>
                <option value="watching">Watching</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
              />
            </div>

            <div className="form-group">
              <label>Runtime</label>
              <input
                type="text"
                name="runtime"
                value={formData.runtime}
                onChange={handleChange}
                placeholder="2h 30m or 45min"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Ratings</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>My Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="1"
              />
            </div>

            <div className="form-group">
              <label>IMDb Rating</label>
              <input
                type="text"
                name="imdb_rating"
                value={formData.imdb_rating}
                onChange={handleChange}
                placeholder="8.5"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Details</h3>
          
          <div className="form-group">
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Action, Thriller, Drama"
            />
          </div>

          <div className="form-group">
            <label>Director</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              placeholder="Director name"
            />
          </div>

          <div className="form-group">
            <label>Cast</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              placeholder="Main actors"
            />
          </div>

          <div className="form-group">
            <label>Streaming Platforms</label>
            <input
              type="text"
              name="streaming_platforms"
              value={formData.streaming_platforms}
              onChange={handleChange}
              placeholder="Netflix, Prime Video, etc."
            />
          </div>
        </div>

        {formData.type === 'series' && (
          <div className="form-section">
            <h3>Series Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Seasons</label>
                <input
                  type="number"
                  name="seasons"
                  value={formData.seasons}
                  onChange={handleChange}
                  placeholder="Number of seasons"
                />
              </div>

              <div className="form-group">
                <label>Total Episodes</label>
                <input
                  type="number"
                  name="total_episodes"
                  value={formData.total_episodes}
                  onChange={handleChange}
                  placeholder="Total episodes"
                />
              </div>

              <div className="form-group">
                <label>Episodes Watched</label>
                <input
                  type="number"
                  name="episodes_watched"
                  value={formData.episodes_watched}
                  onChange={handleChange}
                  placeholder="Episodes watched"
                />
              </div>
            </div>
          </div>
        )}

        <div className="form-section">
          <h3>Dates</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label>Date Added</label>
              <input
                type="date"
                name="date_added"
                value={formData.date_added}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date Finished</label>
              <input
                type="date"
                name="date_finished"
                value={formData.date_finished}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Notes</h3>
          
          <div className="form-group">
            <label>Personal Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="5"
              placeholder="Your thoughts, recommendations, or any notes..."
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {isEditMode ? 'Update' : 'Add Content'}
          </button>
          <Link to="/" className="cancel-btn">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default ContentForm;
