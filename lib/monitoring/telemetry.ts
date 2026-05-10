// Error Telemetry & Monitoring Layer

type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

interface LogPayload {
  level: LogLevel;
  message: string;
  error?: any;
  context?: Record<string, any>;
  tags?: string[];
}

export const logTelemetry = (payload: LogPayload) => {
  const { level, message, error, context, tags } = payload;
  
  // In production, this would send to Sentry, PostHog, or Datadog
  console.log(`[Telemetry:${level.toUpperCase()}] ${message}`, {
    error: error?.message || error,
    context,
    tags,
    timestamp: new Date().toISOString(),
  });

  // Example Sentry Integration:
  // if (level === 'error' || level === 'fatal') {
  //   Sentry.captureException(error || new Error(message), { extra: context, tags: tags?.reduce((acc, t) => ({...acc, [t]: true}), {}) });
  // }
};

export const logWorkerError = (workerName: string, error: any, context?: any) => {
  logTelemetry({
    level: 'error',
    message: `Worker Error: ${workerName}`,
    error,
    context,
    tags: ['worker', workerName]
  });
};

export const logPerformance = (metric: string, value: number, tags?: string[]) => {
  // Log performance metrics to PostHog or Vercel Analytics
  console.log(`[Performance] ${metric}: ${value}ms`, tags);
};
