import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  // Sample data - in real app, this would come from API/database
  const [watchedContent, setWatchedContent] = useState([
    { id: 1, title: 'Stranger Things', type: 'Series', platform: 'Netflix', rating: 5, watched: true },
    { id: 2, title: 'The Mandalorian', type: 'Series', platform: 'Disney+', rating: 4, watched: true },
    { id: 3, title: 'Dune', type: 'Movie', platform: 'Prime Video', rating: 5, watched: true },
  ]);

  const [stats, setStats] = useState({
    totalWatched: 3,
    moviesWatched: 1,
    seriesWatched: 2,
    hoursWatched: 42,
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Track your watching history and discover new content</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalWatched}</h3>
          <p>Total Watched</p>
        </div>
        <div className="stat-card">
          <h3>{stats.moviesWatched}</h3>
          <p>Movies</p>
        </div>
        <div className="stat-card">
          <h3>{stats.seriesWatched}</h3>
          <p>Series</p>
        </div>
        <div className="stat-card">
          <h3>{stats.hoursWatched}</h3>
          <p>Hours Watched</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recently Watched</h2>
        <div className="content-list">
          {watchedContent.map((item) => (
            <div key={item.id} className="content-item">
              <div className="content-info">
                <h3>{item.title}</h3>
                <p className="content-type">{item.type}</p>
                <p className="content-platform">{item.platform}</p>
              </div>
              <div className="content-rating">
                <span className="rating">{'⭐'.repeat(item.rating)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="connected-platforms">
        <h2>Connected Platforms</h2>
        <div className="platform-grid">
          <div className="platform-card netflix">
            <h3>Netflix</h3>
            <p>Connected</p>
          </div>
          <div className="platform-card disney">
            <h3>Disney+</h3>
            <p>Connected</p>
          </div>
          <div className="platform-card amazon">
            <h3>Prime Video</h3>
            <p>Connected</p>
          </div>
          <div className="platform-card hulu">
            <h3>Hulu</h3>
            <p>Not Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
