import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getVisitors, createGuestSlug } from '../utils/tracking';
import './AdminDashboard.css';

function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [source, setSource] = useState('');
  const [newGuestName, setNewGuestName] = useState('');
  const [generatedLinks, setGeneratedLinks] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await getVisitors(password);
    
    if (result.success) {
      setIsAuthenticated(true);
      setVisitors(result.visitors || []);
      setSource(result.source);
      if (result.message) {
        setError(result.message);
      }
    } else {
      setError(result.error || 'Invalid password');
    }
    
    setLoading(false);
  };

  const refreshVisitors = async () => {
    setLoading(true);
    const result = await getVisitors(password);
    if (result.success) {
      setVisitors(result.visitors || []);
    }
    setLoading(false);
  };

  const generateLink = () => {
    if (!newGuestName.trim()) return;
    
    const slug = createGuestSlug(newGuestName);
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/invite/${slug}`;
    
    setGeneratedLinks(prev => [
      { name: newGuestName, slug, link, copied: false },
      ...prev
    ]);
    setNewGuestName('');
  };

  const copyToClipboard = async (link, index) => {
    try {
      await navigator.clipboard.writeText(link);
      setGeneratedLinks(prev => 
        prev.map((item, i) => 
          i === index ? { ...item, copied: true } : item
        )
      );
      setTimeout(() => {
        setGeneratedLinks(prev => 
          prev.map((item, i) => 
            i === index ? { ...item, copied: false } : item
          )
        );
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>🔐 Admin Login</h1>
          <p>Enter password to view visitor data</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Login'}
            </button>
          </form>
          
          {error && <p className="error">{error}</p>}
          
          <p className="hint">Default password: *******</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>📊 Wedding Invitation Tracker</h1>
        <p>Govindaraj & Sathya - February 22, 2026</p>
      </motion.header>

      {/* Link Generator */}
      <motion.section 
        className="link-generator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2>🔗 Generate Guest Links</h2>
        <p>Create personalized invitation links for each guest</p>
        
        <div className="generator-form">
          <input
            type="text"
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
            placeholder="Enter guest name (e.g., Uncle Rajan)"
            onKeyPress={(e) => e.key === 'Enter' && generateLink()}
          />
          <button onClick={generateLink}>Generate Link</button>
        </div>

        {generatedLinks.length > 0 && (
          <div className="generated-links">
            <h3>Generated Links:</h3>
            {generatedLinks.map((item, index) => (
              <div key={index} className="link-item">
                <span className="guest-name">{item.name}</span>
                <code className="link-url">{item.link}</code>
                <button 
                  className={`copy-btn ${item.copied ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(item.link, index)}
                >
                  {item.copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Stats */}
      <motion.section 
        className="stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="stat-card">
          <span className="stat-icon">👥</span>
          <span className="stat-value">{visitors.length}</span>
          <span className="stat-label">Total Visitors</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📱</span>
          <span className="stat-value">
            {visitors.filter(v => v.deviceType === 'Mobile').length}
          </span>
          <span className="stat-label">Mobile</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💻</span>
          <span className="stat-value">
            {visitors.filter(v => v.deviceType === 'Desktop').length}
          </span>
          <span className="stat-label">Desktop</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">
            {visitors.filter(v => v.guestName !== 'Direct Visit').length}
          </span>
          <span className="stat-label">Named Visits</span>
        </div>
      </motion.section>

      {/* Refresh button */}
      <div className="actions">
        <button onClick={refreshVisitors} disabled={loading} className="refresh-btn">
          {loading ? '🔄 Loading...' : '🔄 Refresh Data'}
        </button>
        <span className="source-badge">Source: {source}</span>
      </div>

      {error && source === 'logs' && (
        <motion.div 
          className="info-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>ℹ️ {error}</p>
          <p>To enable persistent storage, set up Vercel KV in your project.</p>
        </motion.div>
      )}

      {/* Visitors Table */}
      <motion.section 
        className="visitors-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2>👀 Recent Visitors</h2>
        
        {visitors.length === 0 ? (
          <div className="no-visitors">
            <p>No visitors tracked yet.</p>
            <p>Share your personalized links to start tracking!</p>
          </div>
        ) : (
          <div className="visitors-table-container">
            <table className="visitors-table">
              <thead>
                <tr>
                  <th>Guest Name</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor, index) => (
                  <motion.tr 
                    key={visitor.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="guest-cell">
                      <span className={visitor.guestName === 'Direct Visit' ? 'direct' : 'named'}>
                        {visitor.guestName}
                      </span>
                    </td>
                    <td>{formatDate(visitor.timestamp)}</td>
                    <td>
                      {visitor.location?.city && visitor.location.city !== 'Unknown' 
                        ? `${visitor.location.city}, ${visitor.location.country}`
                        : visitor.location?.country || 'Local/Dev'}
                    </td>
                    <td>
                      <span className={`device-badge ${(visitor.deviceType || 'unknown').toLowerCase()}`}>
                        {visitor.deviceType === 'Mobile' ? '📱' : '💻'} {visitor.deviceType || 'Unknown'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      <footer className="admin-footer">
        <p>Wedding Invitation Tracker | <a href="/">← Back to Invitation</a></p>
      </footer>
    </div>
  );
}

export default AdminDashboard;


