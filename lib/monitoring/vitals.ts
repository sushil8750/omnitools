import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify(metric);
  // Use navigator.sendBeacon() if available, falling back to fetch()
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body);
  } else {
    fetch('/api/vitals', { body, method: 'POST', keepalive: true });
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics);
  onINP(sendToAnalytics);
  onLCP(sendToAnalytics);
  onFCP(sendToAnalytics);
  onTTFB(sendToAnalytics);
}

export function trackWorkerError(error: ErrorEvent) {
  console.error('[Worker Error]', error.message);
  // Send to Sentry or PostHog
}
