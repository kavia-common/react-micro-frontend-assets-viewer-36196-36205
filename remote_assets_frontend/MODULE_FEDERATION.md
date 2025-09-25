# assets Remote (Module Federation)

This micro-frontend exposes:
- assets/AssetRegistry: getAssets(baseUrl?) -> { calendarGif: string }
- assets/CalendarGifViewer: React component rendering the calendar.gif

## Sharing React safely

The remote is configured to share React and ReactDOM as singletons with `eager: false`. This is the recommended setup to avoid runtime errors like:
"Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react".

Key points:
- Do not configure the host to eagerly consume `react` or `react-dom`.
- Ensure both host and remote use compatible React versions (this remote requires ^18.2.0).
- Initialize sharing before calling `container.init(...)`.

## Host configuration example

```js
// In host webpack ModuleFederationPlugin
remotes: {
  assets: 'assets@https://your-domain.example.com/remoteEntry.js'
},
shared: {
  react: { singleton: true, requiredVersion: '^18.2.0', eager: false },
  'react-dom': { singleton: true, requiredVersion: '^18.2.0', eager: false },
}
```

### Usage in host (standard/non-eager)

```js
// Ensure share scope is initialized before loading modules from the container
await __webpack_init_sharing__('default');

const container = window.assets;
await container.init(__webpack_share_scopes__.default);

// Consume exposed modules
const { getAssets } = await container.get('./AssetRegistry').then(factory => factory());
const { default: CalendarGifViewer } = await container.get('./CalendarGifViewer').then(factory => factory());

// Example: get absolute URL
const { calendarGif } = getAssets();
```

Troubleshooting:
- If you see "Shared module is not available for eager consumption", check that neither host nor remote is marking `react`/`react-dom` with `eager: true`.
- Confirm that both sides declare them as `singleton: true` and that host initializes sharing before module consumption.

Asset absolute path:
- /assets/images/calendar.gif
