# assets Remote (Module Federation)

This micro-frontend exposes:
- assets/AssetRegistry: getAssets(baseUrl?) -> { calendarGif: string }
- assets/CalendarGifViewer: React component rendering the calendar.gif

Host configuration example:

```js
// In host webpack ModuleFederationPlugin
remotes: {
  assets: 'assets@https://your-domain.example.com/remoteEntry.js'
}

// Usage in host
await __webpack_init_sharing__('default');
const container = window.assets;
await container.init(__webpack_share_scopes__.default);

const { getAssets } = await container.get('./AssetRegistry').then(mod => mod());
const { default: CalendarGifViewer } = await container.get('./CalendarGifViewer').then(mod => mod());

// get absolute URL
const { calendarGif } = getAssets();
```

Asset absolute path:
- /assets/images/calendar.gif
