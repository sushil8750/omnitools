// Analytics Layer Abstraction

type EventName = 
  | 'tool_used'
  | 'file_uploaded'
  | 'conversion_success'
  | 'conversion_failed'
  | 'page_view';

interface EventProperties {
  tool_slug?: string;
  file_type?: string;
  file_size?: number;
  error_message?: string;
  [key: string]: any;
}

export const trackEvent = (name: EventName, properties?: EventProperties) => {
  // In production, this would call PostHog, Plausible, or Vercel Analytics
  console.log(`[Analytics] ${name}`, properties);
  
  // Example:
  // if (typeof window !== 'undefined' && window.posthog) {
  //   window.posthog.capture(name, properties);
  // }
};

export const trackToolUsage = (toolSlug: string) => {
  trackEvent('tool_used', { tool_slug: toolSlug });
};
