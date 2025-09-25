import React from 'react';
import './theme.css';

/**
 * PUBLIC_INTERFACE
 * Minimal fallback App component kept for compatibility.
 * Note: The application actually renders App.jsx from index.js.
 * This file intentionally avoids CRA-specific imports that do not exist.
 */
function App() {
  return (
    <div className="app-shell">
      <div className="card">
        <div className="header">
          <span className="badge">assets remote</span>
          <div>
            <div className="title">Remote Assets Frontend</div>
            <div className="subtitle">This fallback is unused in runtime; App.jsx is rendered.</div>
          </div>
        </div>
        <div className="content">
          <div className="asset-panel">
            <div className="asset-url">If you are seeing this, index.js is importing App.js instead of App.jsx.</div>
          </div>
        </div>
        <div className="footer">
          <span className="hint">Ocean Professional theme</span>
          <a className="cta" href="/remoteEntry.js" target="_blank" rel="noreferrer">Open remoteEntry.js</a>
        </div>
      </div>
    </div>
  );
}

export default App;
