import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Entry renders a local preview only.
// IMPORTANT: Do not use webpack/sharing/consume or any eager MF consumption here.
// The remote's React is shared lazily as a singleton via Module Federation config.
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
