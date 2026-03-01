/**
 * Wrap outreach email HTML with tracking pixel and click-rewritten links.
 */
export function wrapEmailWithTracking(
  html: string,
  trackingId: string,
  baseUrl: string
): string {
  // Rewrite links for click tracking
  const trackedHtml = html.replace(
    /href="(https?:\/\/[^"]+)"/g,
    (_match, url) => {
      const encoded = encodeURIComponent(url);
      return `href="${baseUrl}/api/tracking/click/${trackingId}?url=${encoded}"`;
    }
  );

  // Append open tracking pixel
  const pixel = `<img src="${baseUrl}/api/tracking/open/${trackingId}" width="1" height="1" style="display:none" alt="" />`;

  return trackedHtml + pixel;
}
