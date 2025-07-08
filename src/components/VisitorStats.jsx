import React from 'react';
import './VisitorStats.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CloseIcon from '@mui/icons-material/Close';

const VisitorStats = ({ visitorStats, isOpen, onClose }) => {
  if (!isOpen || !visitorStats) return null;

  const { totalVisitors, localVisitors, uniqueCountries, uniqueCities, topCountries, topCities } = visitorStats;

  return (
    <div className="visitor-stats-overlay" onClick={onClose}>
      <div className="visitor-stats-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            <TrendingUpIcon className="modal-icon" />
            Visitor Analytics
          </h3>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <VisibilityIcon className="stat-icon visitors" />
            <div className="stat-info">
              <span className="stat-value">{totalVisitors.toLocaleString()}</span>
              <span className="stat-label">Global Visitors</span>
            </div>
          </div>

          <div className="stat-card">
            <PublicIcon className="stat-icon countries" />
            <div className="stat-info">
              <span className="stat-value">{uniqueCountries}</span>
              <span className="stat-label">Countries (Local)</span>
            </div>
          </div>

          <div className="stat-card">
            <LocationCityIcon className="stat-icon cities" />
            <div className="stat-info">
              <span className="stat-value">{uniqueCities}</span>
              <span className="stat-label">Cities (Local)</span>
            </div>
          </div>
        </div>

        <div className="global-info">
          <p className="info-text">
            🌍 <strong>{totalVisitors.toLocaleString()}</strong> total visitors from around the world
          </p>
          <p className="info-text">
            💻 <strong>{localVisitors}</strong> visitors tracked by your browser
          </p>
        </div>

        {topCountries && topCountries.length > 0 && (
          <div className="top-locations">
            <h4>Top Countries</h4>
            <div className="location-list">
              {topCountries.map((item, index) => (
                <div key={index} className="location-item">
                  <span className="location-name">{item.country}</span>
                  <span className="location-count">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {topCities && topCities.length > 0 && (
          <div className="top-locations">
            <h4>Top Cities</h4>
            <div className="location-list">
              {topCities.map((item, index) => (
                <div key={index} className="location-item">
                  <span className="location-name">{item.location}</span>
                  <span className="location-count">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-footer">
          <p className="privacy-note">
            🌍 Global counter shared by all visitors • 📍 Location data is approximate and based on IP address • 🔒 No personal information is stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorStats;
