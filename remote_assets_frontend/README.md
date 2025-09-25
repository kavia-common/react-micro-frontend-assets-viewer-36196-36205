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

Place the GIF at:
- public/assets/images/calendar.gif

It will be served at the absolute URL:
/assets/images/calendar.gif

## Module Federation

Remote name: `assets`  
Remote entry: `remoteEntry.js`

Exposes:
- `./AssetRegistry` -> `getAssets(baseUrl?)`
- `./CalendarGifViewer` -> React component

See MODULE_FEDERATION.md for host integration examples.
