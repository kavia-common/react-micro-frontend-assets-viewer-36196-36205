import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * CalendarGifViewer is an embeddable component that renders the calendar.gif asset
 * using an absolute URL (/assets/images/calendar.gif). Host apps can mount this component
 * after consuming it via Module Federation from the 'assets' remote.
 */
export default function CalendarGifViewer({ height = 320 }) {
  const gifUrl = '/assets/images/calendar.gif';

  return (
    <div className="app-shell" style={{ padding: 0 }}>
      <div className="card" role="region" aria-label="Calendar GIF asset viewer">
        <div className="header">
          <span className="badge">assets remote</span>
          <div>
            <div className="title">Calendar GIF</div>
            <div className="subtitle">Served via absolute path at {gifUrl}</div>
          </div>
        </div>
        <div className="content">
          <div className="asset-panel">
            <div style={{ marginBottom: 8, fontWeight: 600 }}>Absolute URL</div>
            <div className="asset-url">{gifUrl}</div>
          </div>
          <div className="preview" style={{ minHeight: height }}>
            {/* The asset must exist at public/assets/images/calendar.gif in this project.
                Hosts embedding this component should ensure the remote is served so that
                this absolute path is reachable. */}
            <img src={gifUrl} alt="Animated calendar" />
          </div>
        </div>
        <div className="footer">
          <span className="hint">Ocean Professional theme applied</span>
          <button className="cta" type="button" onClick={() => window.open(gifUrl, '_blank')}>
            Open GIF
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M14 3h7v7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 14v7H3V3h7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
