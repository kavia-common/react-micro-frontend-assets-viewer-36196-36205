/**
 * PUBLIC_INTERFACE
 * Returns a registry of exposed asset URLs from this remote.
 * Consumers can import { getAssets } from 'assets/AssetRegistry' after loading the remote.
 */
export function getAssets(baseUrl = '') {
  /**
   * baseUrl can be used by hosts that mount the remote at a sub-path.
   * If omitted, we default to absolute paths which is recommended for CDNs and standalone serving.
   */
  const toAbsolute = (p) => {
    if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('/')) return p;
    return `/${p.replace(/^\/+/, '')}`;
  };

  const assets = {
    calendarGif: toAbsolute('assets/images/calendar.gif'),
  };

  if (!baseUrl) return assets;

  const normalized = (url) =>
    url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `${baseUrl.replace(/\/+$/, '')}${url.startsWith('/') ? '' : '/'}${url.replace(/^\/+/, '')}`;

  return {
    calendarGif: normalized(assets.calendarGif),
  };
}

export default { getAssets };
