# assets Remote (Module Federation)

This micro-frontend exposes:
- assets/AssetRegistry: getAssets(baseUrl?) -> { calendarGif: string }
- assets/CalendarGifViewer: React component rendering the calendar.gif

## Sharing React safely (no eager consumption)

The remote is configured to share React and ReactDOM as singletons with `eager: false`. This avoids runtime errors such as:
"Shared module is not available for eager consumption: webpack/sharing/consume/default/react/react".

Key rules:
- Never configure `eager: true` for `react` or `react-dom` in either host or remote.
- Do not use `webpack/sharing/consume` imports or any entry-point code that could force eager consumption.
- Ensure both host and remote use compatible React versions (this remote requires ^18.2.0).
- Initialize sharing before calling `container.init(...)` in the host.

Webpack notes:
- The remote disables `optimization.runtimeChunk` to keep a single runtime that works well with hosts using lazy remote loading.
- The remote does not consume its own shared React eagerly; React/ReactDOM are singletons with `eager: false`.

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

Verification checklist:
- Host and remote both share `react` and `react-dom` with `{ singleton: true, eager: false }`.
- Host calls `await __webpack_init_sharing__('default')` before `await window.assets.init(__webpack_share_scopes__.default)`.
- No `webpack/sharing/consume` imports are used in host or remote entry points.
- Remote builds include a single runtime (runtimeChunk disabled).

Troubleshooting:
- If you see "Shared module is not available for eager consumption", search your codebase for `eager: true` and `webpack/sharing/consume`.
- Confirm that the host is not loading the remote’s modules before initializing the share scope.

Asset absolute path:
- /assets/images/calendar.gif
