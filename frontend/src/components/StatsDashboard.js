import React, { useState, useEffect } from 'react';
import './StatsDashboard.css';
import { apiService } from '../services/apiService';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch platform statistics
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.getStats();
        setStats(response.stats || response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-dashboard-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="stats-dashboard-container">
        <div className="error">Error loading statistics: {error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <h2>Platform Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-card patients">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Patients</h3>
            <div className="stat-number">{stats.totalPatients || 0}</div>
          </div>
        </div>

        <div className="stat-card records">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Medical Records</h3>
            <div className="stat-number">{stats.totalRecords || 0}</div>
          </div>
        </div>

        <div className="stat-card consents">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Total Consents</h3>
            <div className="stat-number">{stats.totalConsents || 0}</div>
          </div>
        </div>

        <div className="stat-card active-consents">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Active Consents</h3>
            <div className="stat-number">{stats.activeConsents || 0}</div>
          </div>
        </div>

        <div className="stat-card pending-consents">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>Pending Consents</h3>
            <div className="stat-number">{stats.pendingConsents || 0}</div>
          </div>
        </div>

        <div className="stat-card transactions">
          <div className="stat-icon">🔗</div>
          <div className="stat-content">
            <h3>Blockchain Transactions</h3>
            <div className="stat-number">{stats.totalTransactions || 0}</div>
          </div>
        </div>
      </div>

      {stats.lastUpdated && (
        <div className="stats-footer">
          <p>Last updated: {new Date(stats.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;


