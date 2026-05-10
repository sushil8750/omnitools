export interface BrowserCapabilities {
  webWorkers: boolean;
  sharedArrayBuffer: boolean;
  wasm: boolean;
  fileSystemAccess: boolean;
}

export const getBrowserCapabilities = (): BrowserCapabilities => {
  if (typeof window === 'undefined') {
    return {
      webWorkers: false,
      sharedArrayBuffer: false,
      wasm: false,
      fileSystemAccess: false,
    };
  }

  return {
    webWorkers: typeof Worker !== 'undefined',
    sharedArrayBuffer: typeof SharedArrayBuffer !== 'undefined',
    wasm: typeof WebAssembly !== 'undefined',
    fileSystemAccess: 'showOpenFilePicker' in window,
  };
};

export const checkRequirement = (requirement: keyof BrowserCapabilities): boolean => {
  const caps = getBrowserCapabilities();
  return caps[requirement];
};

export const FallbackMessages = {
  SHARED_ARRAY_BUFFER: "Your browser does not support SharedArrayBuffer, which is required for high-speed video processing. Please try using a modern version of Chrome or Edge.",
  WASM: "WebAssembly is disabled or not supported in your browser. This tool requires WebAssembly to function.",
  WEB_WORKERS: "Web Workers are not supported. This tool may perform slowly or freeze your browser."
};
