# Remote Assets Frontend (assets remote)

A React micro-frontend using Webpack Module Federation to expose:
- An asset registry with absolute URL to a calendar GIF
- A React component that previews the calendar GIF

Theme: Ocean Professional (blue primary, amber secondary, minimal rounded cards with subtle shadows)

## Quickstart

```bash
cd remote_assets_frontend
npm install
npm run start  # dev on http://localhost:3001
# or
npm run build  # output in dist/
npm run preview
```

Local preview:
- Dev server: http://localhost:3001
- Remote entry for host: http://localhost:3001/remoteEntry.js
- Preview build: `npm run preview` serves dist on port 3001

Place the GIF at:
- public/assets/images/calendar.gif

It will be served at the absolute URL:
- /assets/images/calendar.gif

## Module Federation

Remote name: `assets`  
Remote entry: `remoteEntry.js`

Exposes:
- `./AssetRegistry` -> `getAssets(baseUrl?)`
- `./CalendarGifViewer` -> React component

### React sharing configuration (no eager)

This remote shares `react` and `react-dom` as singletons with `eager: false` and disables runtime chunk splitting for predictable lazy remote loading by hosts. This avoids the runtime error:
"Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react".

Verification steps:
1) Start the remote (`npm run start`) or build+preview.
2) From a host, initialize sharing (`await __webpack_init_sharing__('default')`), then `await window.assets.init(__webpack_share_scopes__.default)`.
3) Ensure the host also shares `react` and `react-dom` with `{ singleton: true, eager: false }` and compatible versions.
4) Load exposed modules with `container.get(...)`.

See MODULE_FEDERATION.md for host integration examples and troubleshooting.
