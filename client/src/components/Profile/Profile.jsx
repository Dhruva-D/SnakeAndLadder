import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import LoadingSpinner from '../Common/LoadingSpinner';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    region: '',
    language: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      setProfileData(data);
      setFormData({
        region: data.user.region || 'International',
        language: data.user.language || 'English'
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileService.updateProfile(formData);
      await fetchProfile();
      setIsEditing(false);
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profileData) return <LoadingSpinner message="Loading Profile..." />;

  if (!profileData) return <div className="profile-error">Failed to load profile</div>;

  const { user, stats, history } = profileData;

  return (
    <div className="profile-container" style={{ backgroundImage: 'url(/bg/gamebg.jpg)' }}>
      <div className="profile-header">
        <div className="profile-avatar">
          👤
        </div>
        <h1>{user.username}</h1>
        <p className="profile-email">{user.email}</p>
        <p className="profile-joined">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      <div className="profile-grid">
        {/* Settings Section */}
        <div className="profile-card settings-card">
          <div className="card-header">
            <h2>⚙️ Settings</h2>
            {!isEditing && (
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label>Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                >
                  <option value="International">International</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                </select>
              </div>
              <div className="form-group">
                <label>Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            <div className="info-list">
              <div className="info-item">
                <span className="label">Region</span>
                <span className="value">{user.region || 'International'}</span>
              </div>
              <div className="info-item">
                <span className="label">Language</span>
                <span className="value">{user.language || 'English'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="profile-card stats-card">
          <h2>📊 Analytics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{stats.total_games}</span>
              <span className="stat-label">Games Played</span>
            </div>
            <div className="stat-item">
              <span className="stat-value win">{stats.wins}</span>
              <span className="stat-label">Wins</span>
            </div>
            <div className="stat-item">
              <span className="stat-value loss">{stats.losses}</span>
              <span className="stat-label">Losses</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.avg_moves}</span>
              <span className="stat-label">Avg Moves</span>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="profile-card history-card">
          <h2>📜 Recent Games</h2>
          <div className="history-list">
            {history && history.length > 0 ? (
              history.map((game) => (
                <div key={game.id} className={`history-item ${game.result.toLowerCase()}`}>
                  <div className="game-info">
                    <span className="game-result">{game.result}</span>
                    <span className="game-date">{new Date(game.played_at).toLocaleDateString()}</span>
                  </div>
                  <div className="game-details">
                    <span>vs {game.opponent_name || 'Computer'}</span>
                    <span>{game.moves} moves</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-history">No games played yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
