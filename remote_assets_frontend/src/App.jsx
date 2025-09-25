import React from 'react';
import './theme.css';

export default function App() {
  const gifUrl = '/assets/images/calendar.gif';
  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <span className="badge">assets remote</span>
          <div>
            <div className="title">Remote Assets Frontend</div>
            <div className="subtitle">Exposing assets and components via Module Federation</div>
          </div>
        </div>
        <div className="content">
          <div className="asset-panel">
            <div style={{ marginBottom: 8, fontWeight: 600 }}>Calendar GIF absolute URL</div>
            <div className="asset-url">{gifUrl}</div>
          </div>
          <div className="preview" style={{ minHeight: 320 }}>
            <img src={gifUrl} alt="Animated calendar" />
          </div>
        </div>
        <div className="footer">
          <span className="hint">Ocean Professional • Blue & amber accents</span>
          <a className="cta" href="/remoteEntry.js" target="_blank" rel="noreferrer">Open remoteEntry.js</a>
        </div>
      </div>
    </div>
  );
}
