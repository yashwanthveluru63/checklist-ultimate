import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import './Profile.css';

function Profile() {
  const { content: contents } = useContent();
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');
  
  // Profile data from localStorage
  const [profile, setProfile] = useState({
    name: localStorage.getItem('userName') || 'CheckList User',
    email: localStorage.getItem('userEmail') || '',
    bio: localStorage.getItem('userBio') || '',
    avatar: localStorage.getItem('userAvatar') || '👤',
  });

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    bio: profile.bio,
    avatar: profile.avatar,
  });

  // eslint-disable-next-line no-unused-vars
  const [isEditing, setIsEditing] = useState(false);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: localStorage.getItem('emailNotifications') !== 'false',
    autoBackup: localStorage.getItem('autoBackup') !== 'false',
    showStats: localStorage.getItem('showStats') !== 'false',
  });

  // Apply theme on mount and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Statistics
  const stats = {
    total: contents.length,
    watching: contents.filter(c => c.status === 'watching').length,
    completed: contents.filter(c => c.status === 'completed').length,
    planToWatch: contents.filter(c => c.status === 'plan-to-watch').length,
    onHold: contents.filter(c => c.status === 'on-hold').length,
    dropped: contents.filter(c => c.status === 'dropped').length,
  };

  const typeBreakdown = {
    movies: contents.filter(c => c.type === 'movie').length,
    series: contents.filter(c => c.type === 'series').length,
    anime: contents.filter(c => c.type === 'anime').length,
    documentaries: contents.filter(c => c.type === 'documentary').length,
  };

  // Handle profile edit
  const handleEditSave = () => {
    localStorage.setItem('userName', editForm.name);
    localStorage.setItem('userEmail', editForm.email);
    localStorage.setItem('userBio', editForm.bio);
    localStorage.setItem('userAvatar', editForm.avatar);
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditForm({ ...profile });
    setIsEditing(false);
  };

  // Handle settings change
  const handleSettingChange = (setting, value) => {
    const newSettings = { ...settings, [setting]: value };
    setSettings(newSettings);
    localStorage.setItem(setting, value);
  };

  // Export watchlist data
  const handleExportData = () => {
    const dataStr = JSON.stringify(contents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `checklist-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Clear all data
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all watchlist data? This cannot be undone!')) {
      localStorage.removeItem('watchlistContents');
      window.location.reload();
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header-section">
        <div className="profile-avatar-large">{profile.avatar}</div>
        <h1>{profile.name}</h1>
        {profile.email && <p className="profile-email">{profile.email}</p>}
        {profile.bio && <p className="profile-bio">{profile.bio}</p>}
      </div>

      {/* Tab Navigation - Only 3 tabs now */}
      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          Edit Profile
        </button>
        <button 
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-panel">
            <div className="profile-stats">
              <h2>Watchlist Statistics</h2>
              <div className="stats-grid">
                <div className="stat-card"><div className="stat-value">{stats.total}</div><div className="stat-label">Total Items</div></div>
                <div className="stat-card"><div className="stat-value">{stats.watching}</div><div className="stat-label">Watching</div></div>
                <div className="stat-card"><div className="stat-value">{stats.completed}</div><div className="stat-label">Completed</div></div>
                <div className="stat-card"><div className="stat-value">{stats.planToWatch}</div><div className="stat-label">Plan to Watch</div></div>
                <div className="stat-card"><div className="stat-value">{stats.onHold}</div><div className="stat-label">On Hold</div></div>
                <div className="stat-card"><div className="stat-value">{stats.dropped}</div><div className="stat-label">Dropped</div></div>
              </div>
            </div>

            <div className="profile-breakdown">
              <h2>Content Type Breakdown</h2>
              <div className="breakdown-grid">
                <div className="breakdown-item"><span className="breakdown-label">Movies:</span><span className="breakdown-value">{typeBreakdown.movies}</span></div>
                <div className="breakdown-item"><span className="breakdown-label">Series:</span><span className="breakdown-value">{typeBreakdown.series}</span></div>
                <div className="breakdown-item"><span className="breakdown-label">Anime:</span><span className="breakdown-value">{typeBreakdown.anime}</span></div>
                <div className="breakdown-item"><span className="breakdown-label">Documentaries:</span><span className="breakdown-value">{typeBreakdown.documentaries}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Tab */}
        {activeTab === 'edit' && (
          <div className="tab-panel">
            <div className="edit-section">
              <h2>Edit Your Profile</h2>
              <div className="edit-form">
                <div className="form-group">
                  <label>Avatar (Emoji)</label>
                  <input 
                    type="text" 
                    value={editForm.avatar}
                    onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                    placeholder="👤"
                    maxLength="2"
                  />
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <input 
                    type="text" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Bio</label>
                  <textarea 
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    placeholder="Tell us about yourself..."
                    rows="4"
                  />
                </div>

                <div className="form-actions">
                  <button className="btn-primary" onClick={handleEditSave}>Save Changes</button>
                  <button className="btn-secondary" onClick={handleEditCancel}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab - Now includes Data Management */}
        {activeTab === 'settings' && (
          <div className="tab-panel">
            <div className="settings-section">
              <h2>Account Settings</h2>
              
              {/* Theme Toggle */}
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Dark Mode</h3>
                  <p>Toggle between light and dark theme</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={isDarkMode}
                    onChange={(e) => setIsDarkMode(e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* Email Notifications */}
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Email Notifications</h3>
                  <p>Receive updates about your watchlist</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* Auto Backup */}
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Auto Backup</h3>
                  <p>Automatically backup your data locally</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.autoBackup}
                    onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              {/* Show Stats */}
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Show Statistics</h3>
                  <p>Display watchlist stats on overview</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.showStats}
                    onChange={(e) => handleSettingChange('showStats', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Data Management Section - Moved from Data tab */}
            <div className="data-section">
              <h2>Data Management</h2>
              
              <div className="data-card">
                <h3>Export Watchlist</h3>
                <p>Download your entire watchlist as a JSON file</p>
                <button className="btn-primary" onClick={handleExportData}>
                  💾 Export Data
                </button>
              </div>

              <div className="data-card danger">
                <h3>Clear All Data</h3>
                <p>Permanently delete all watchlist data. This action cannot be undone.</p>
                <button className="btn-danger" onClick={handleClearData}>
                  🗑️ Clear Data
                </button>
              </div>

              <div className="data-info">
                <p><strong>Total Items:</strong> {stats.total}</p>
                <p><strong>Storage Used:</strong> {(JSON.stringify(contents).length / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
